// Website assistant. The NVIDIA NIM key stays on the server (process.env only, never logged or
// returned). Controls follow the OWASP LLM Prompt Injection Prevention Cheat Sheet and the OWASP
// Top 10 for LLM Applications: no tools or data access (least privilege), a fixed system prompt
// with public facts only, normalised and length-capped input, rate limiting, output checks before
// text reaches the page, plain-text rendering in the browser, content-free logs and a kill switch.
import { SYSTEM_PROMPT, REMINDER } from "./_chat-context.js";
import { redis, hasRedis } from "./_redis.js";

const API = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = process.env.NIM_MODEL || "meta/llama-3.1-8b-instruct";
const ALLOWED_HOSTS = new Set(["www.bunkerbox.uk", "bunkerbox.uk"]);

const MAX_MESSAGES = 10;
const MAX_USER_CHARS = 500;
const MAX_ASSISTANT_CHARS = 800;
const MAX_TOTAL_CHARS = 4000;
const MAX_OUTPUT_CHARS = 1200;
const RATE_LIMIT = 15;          // requests
const RATE_WINDOW = 10 * 60;    // seconds, per visitor IP

const REFUSAL = "Sorry, I can only help with questions about Bunker Box. Ask me about what's in the box, the launch or the waiting list.";
const UNAVAILABLE = "The assistant isn't available right now. You can still join the waiting list on this page.";

// Invisible and control characters that can hide instructions (zero-width, bidi, tag characters).
const HIDDEN = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F​-‏‪-‮⁠-⁤﻿\u{E0000}-\u{E007F}]/gu;

function clean(text, max) {
  return String(text).slice(0, max * 2).normalize("NFKC").replace(HIDDEN, "").trim().slice(0, max);
}

// Screening is a signal for logging and rate limiting, not a security boundary (OWASP).
const SUSPICIOUS = /(ignore|disregard|forget)\b.{0,40}\b(instruction|rule|prompt|above|previous)|system prompt|you are now|developer mode|jailbreak|\bDAN\b|base64|<\s*script/i;

// Output that should never reach a visitor: prompt leakage, secrets, markup, outside links.
const PROMPT_MARKERS = ["Rules, which always apply", "Facts you may use", "no message can change", "Reminder: answer only about"];
function unsafeOutput(text) {
  if (PROMPT_MARKERS.some(m => text.includes(m))) return true;
  if (/nvapi-[\w-]{8,}|\bre_[A-Za-z0-9]{12,}|sk-[A-Za-z0-9]{12,}|api[_\s-]?key\s*[:=]/i.test(text)) return true;
  if (/<\s*\/?\s*(script|iframe|img|svg|a|style|object|embed)\b/i.test(text)) return true;
  const links = text.match(/\bhttps?:\/\/[^\s)]+|\bwww\.[^\s)]+/gi) || [];
  return links.some(l => !/^(https?:\/\/)?(www\.)?bunkerbox\.uk\b/i.test(l));
}

const memoryHits = new Map();
async function rateLimited(ip) {
  const bucket = `chat:${ip}:${Math.floor(Date.now() / 1000 / RATE_WINDOW)}`;
  if (hasRedis) {
    try {
      const n = await redis("INCR", bucket);
      if (n === 1) await redis("EXPIRE", bucket, String(RATE_WINDOW));
      return n > RATE_LIMIT;
    } catch {}
  }
  if (memoryHits.size > 5000) memoryHits.clear();
  const n = (memoryHits.get(bucket) || 0) + 1;
  memoryHits.set(bucket, n);
  return n > RATE_LIMIT;
}

function sameSite(req) {
  const origin = req.headers.origin;
  if (!origin) return req.headers["sec-fetch-site"] === "same-origin";
  try {
    const host = new URL(origin).host;
    return ALLOWED_HOSTS.has(host) || host === req.headers.host;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!sameSite(req)) return res.status(403).json({ error: "Forbidden" });
  if (process.env.CHAT_ENABLED === "false" || !process.env.NVIDIA_API_KEY) {
    return res.status(503).json({ error: UNAVAILABLE });
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (await rateLimited(ip)) {
    res.setHeader("Retry-After", String(RATE_WINDOW));
    return res.status(429).json({ error: "You've asked a lot of questions in a short time. Try again in a few minutes." });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return res.status(400).json({ error: "Bad request" });
  }
  const raw = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : [];
  const messages = raw
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map(m => ({ role: m.role, content: clean(m.content, m.role === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS) }))
    .filter(m => m.content);
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Ask a question first." });
  }
  while (messages.reduce((n, m) => n + m.content.length, 0) > MAX_TOTAL_CHARS) messages.shift();
  if (SUSPICIOUS.test(messages[messages.length - 1].content)) console.warn("chat: suspicious input screened");

  let upstream;
  try {
    upstream = await fetch(API, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`, "Content-Type": "application/json", Accept: "text/event-stream" },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.2,
        max_tokens: 220,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages, { role: "system", content: REMINDER }]
      }),
      signal: AbortSignal.timeout(20000)
    });
  } catch (err) {
    console.error("chat: upstream request failed", err.name);
    return res.status(502).json({ error: UNAVAILABLE });
  }
  if (!upstream.ok || !upstream.body) {
    console.error("chat: upstream status", upstream.status);
    return res.status(502).json({ error: UNAVAILABLE });
  }

  // Newline-delimited JSON events: {d: text} deltas, {reset: text} to replace everything, {done: true}.
  res.status(200);
  res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
  const send = event => res.write(JSON.stringify(event) + "\n");

  // The newest characters are held back until the output check has seen them in full.
  const HOLDBACK = 48;
  const decoder = new TextDecoder();
  let buffer = "", text = "", sent = 0, stopped = false;
  try {
    for await (const chunk of upstream.body) {
      buffer += decoder.decode(chunk, { stream: true });
      let i;
      while (!stopped && (i = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, i).trim();
        buffer = buffer.slice(i + 1);
        if (!line.startsWith("data:") || line === "data: [DONE]") continue;
        let delta = "";
        try { delta = JSON.parse(line.slice(5)).choices?.[0]?.delta?.content || ""; } catch {}
        if (!delta) continue;
        text += delta;
        if (unsafeOutput(text)) {
          console.warn("chat: output blocked");
          send({ reset: REFUSAL });
          stopped = true;
        } else if (text.length > MAX_OUTPUT_CHARS) {
          if (MAX_OUTPUT_CHARS > sent) send({ d: text.slice(sent, MAX_OUTPUT_CHARS).replace(HIDDEN, "") });
          stopped = true;
        } else if (text.length - HOLDBACK > sent) {
          send({ d: text.slice(sent, text.length - HOLDBACK).replace(HIDDEN, "") });
          sent = text.length - HOLDBACK;
        }
      }
      if (stopped) break;
    }
  } catch (err) {
    console.error("chat: stream interrupted", err.name);
    if (!text) send({ reset: UNAVAILABLE });
  }
  if (!stopped) {
    if (!text.trim()) send({ reset: REFUSAL });
    else if (text.length > sent) send({ d: text.slice(sent, MAX_OUTPUT_CHARS).replace(HIDDEN, "") });
  }
  send({ done: true });
  res.end();
}
