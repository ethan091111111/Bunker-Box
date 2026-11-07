const $ = s => document.querySelector(s);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const FALLBACK = "We couldn't post your name just now. Try again in a minute.";
$("#year").textContent = new Date().getFullYear();

// Count line: only once there are a few names.
function showCount(n) {
  if (typeof n !== "number" || n < 5) return;
  $("#count").textContent = n.toLocaleString("en-GB");
  $("#count-line").hidden = false;
}
fetch("/api/join").then(r => r.ok ? r.json() : null).then(d => d && showCount(d.count)).catch(() => {});

const board = $("#board"), form = $("#waitlist"), msg = $("#msg"), submit = $("#submit"), submitLabel = $("#submit-label");
const nameInput = $("#name");

// Phone dock: a thumb-height way back to the form once it scrolls away.
const dock = $("#dock"), dockBtn = $("#dock-btn"), phone = matchMedia("(max-width: 760px)");
let joined = false; const seen = new Map();
function updateDock() {
  const anyVisible = [...seen.values()].some(Boolean);
  const show = phone.matches && !joined && !anyVisible && scrollY > 200;
  dock.classList.toggle("show", show);
  dockBtn.tabIndex = show ? 0 : -1;
  dock.setAttribute("aria-hidden", String(!show));
  document.body.classList.toggle("dock-on", show);
}
const dockWatch = new IntersectionObserver(es => { es.forEach(e => seen.set(e.target, e.isIntersecting)); updateDock(); });
[form, $("#last"), $("footer")].forEach(el => dockWatch.observe(el));
addEventListener("scroll", updateDock, { passive: true });
phone.addEventListener?.("change", updateDock);
dockBtn.addEventListener("click", () => {
  nameInput.focus({ preventScroll: true });
  board.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
});

function fail(text, field) {
  msg.textContent = text; msg.className = "msg error";
  if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
  if (!reduced) board.animate([{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "translateX(0)" }], { duration: 240, easing: EASE });
}

function showJoined(name, position, existing) {
  joined = true; updateDock();
  const pos = position ? String(position) : "In";
  $("#pos").textContent = pos;
  $("#posted-name").textContent = name;
  $("#posted-pos").textContent = position ? `Number ${position} on the waiting list` : "On the waiting list";
  if (existing) $("#posted-text").textContent = "That email was already on the list, so your place is saved. We'll email you before boxes go on sale.";
  $("#form-extra").hidden = true; $("#posted").hidden = false;
  if (!reduced) $("#posted").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: EASE });
  $("#announce").textContent = $("#posted-text").textContent + (position ? ` You're number ${position}.` : "");
  $("#share").focus({ preventScroll: true });
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  msg.textContent = ""; msg.className = "msg";
  form.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
  const data = Object.fromEntries(new FormData(form));
  data.consent = form.consent.checked;
  if (!data.name.trim()) return fail("Add your first name so we know who the box is for.", nameInput);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return fail("That email doesn't look right. Check it and try again.", $("#email"));
  if (!data.consent) return fail("Tick the box so we're allowed to email you about the launch.", $("#consent"));
  submit.disabled = true; submitLabel.textContent = "Joining…";
  try {
    const res = await fetch("/api/join", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const out = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(out.error || FALLBACK);
    showJoined(data.name.trim(), out.position, out.existing);
    showCount(out.count);
  } catch (err) {
    fail(err instanceof TypeError ? FALLBACK : err.message);
  } finally {
    submit.disabled = false; submitLabel.textContent = "Join the waiting list";
  }
});

$("#share").addEventListener("click", async () => {
  const share = { title: "Bunker Box", text: "Golf mystery boxes, on sale before Christmas. Get on the waiting list:", url: location.origin };
  try {
    if (navigator.share) await navigator.share(share);
    else { await navigator.clipboard.writeText(share.url); $("#share").textContent = "Link copied"; }
  } catch {}
});
// Assistant: answers stream in as plain text (textContent only, never HTML).
const chat = $("#chat"), fab = $("#chat-fab"), chatLog = $("#chat-log"), chatForm = $("#chat-form"), chatInput = $("#chat-input"), chatSend = $("#chat-send");
const history = [];
let busy = false;
function setChat(open) {
  if (open) chat.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    chat.classList.toggle("open", open);
    if (open) chatInput.focus();
  }));
  fab.setAttribute("aria-expanded", String(open));
  if (!open) {
    fab.focus();
    setTimeout(() => { if (!chat.classList.contains("open")) chat.hidden = true; }, 220);
  }
}
fab.addEventListener("click", () => setChat(!chat.classList.contains("open")));
$("#chat-close").addEventListener("click", () => setChat(false));
chat.addEventListener("keydown", e => { if (e.key === "Escape") setChat(false); });
function bubble(text, who) {
  const p = document.createElement("p");
  p.className = "bubble " + who;
  p.textContent = text;
  chatLog.append(p);
  chatLog.scrollTop = chatLog.scrollHeight;
  return p;
}
async function ask(question) {
  question = question.trim().slice(0, 500);
  if (!question || busy) return;
  busy = true; chatSend.disabled = true;
  $("#chat-quick")?.remove();
  bubble(question, "me");
  history.push({ role: "user", content: question });
  const reply = bubble("Thinking…", "bot wait");
  let text = "";
  try {
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history.slice(-10) }) });
    if (!res.ok || !res.body) {
      const out = await res.json().catch(() => ({}));
      throw new Error(out.error || "The assistant isn't available right now. You can still join the waiting list on this page.");
    }
    const reader = res.body.getReader(), decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let i;
      while ((i = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, i); buffer = buffer.slice(i + 1);
        let ev; try { ev = JSON.parse(line); } catch { continue; }
        if (typeof ev.d === "string") text += ev.d;
        if (typeof ev.reset === "string") text = ev.reset;
        if (text) { reply.className = "bubble bot"; reply.textContent = text; chatLog.scrollTop = chatLog.scrollHeight; }
      }
    }
    if (!text) throw new Error("Sorry, I didn't catch that. Try asking another way.");
    history.push({ role: "assistant", content: text });
  } catch (err) {
    history.pop();
    reply.className = "bubble bot";
    reply.textContent = err instanceof TypeError ? "The assistant isn't available right now. You can still join the waiting list on this page." : err.message;
  } finally {
    busy = false; chatSend.disabled = false; chatInput.focus();
  }
}
chatForm.addEventListener("submit", e => { e.preventDefault(); const q = chatInput.value; chatInput.value = ""; ask(q); });
$("#chat-quick").addEventListener("click", e => { if (e.target.closest("button")) ask(e.target.textContent); });
