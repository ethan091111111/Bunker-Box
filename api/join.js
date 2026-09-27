import { redis, KEY, COUNTER } from "./_redis.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  try {
    if (req.method === "GET") {
      return res.status(200).json({ count: await redis("HLEN", KEY) });
    }
    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const name = String(body.name || "").trim().slice(0, 80);
    const email = String(body.email || "").trim().toLowerCase().slice(0, 200);
    const level = String(body.level || "").trim().slice(0, 40);

    // Honeypot: bots fill the hidden field. Pretend it worked.
    if (body.company) return res.status(200).json({ ok: true });

    if (!name) return res.status(400).json({ error: "Please enter your first name." });
    if (!EMAIL_RE.test(email)) return res.status(400).json({ error: "Please enter a valid email address." });
    if (body.consent !== true) return res.status(400).json({ error: "Please tick the box so we can email you." });

    const record = { name, email, level, joinedAt: new Date().toISOString() };
    const added = await redis("HSETNX", KEY, email, JSON.stringify(record));

    if (!added) {
      const existing = JSON.parse(await redis("HGET", KEY, email));
      return res.status(200).json({ ok: true, existing: true, position: existing.position, count: await redis("HLEN", KEY) });
    }

    record.position = await redis("INCR", COUNTER);
    await redis("HSET", KEY, email, JSON.stringify(record));

    return res.status(201).json({ ok: true, position: record.position, count: await redis("HLEN", KEY) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Sorry, we couldn't save your spot. Please try again." });
  }
}
