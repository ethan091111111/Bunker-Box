const API = "https://api.resend.com";
const apiKey = process.env.RESEND_API_KEY;
const to = process.env.NOTIFY_EMAIL;
// RESEND_FROM is set once mail.bunkerbox.uk is verified in Resend. Until then only the
// team alert can go out, from Resend's test sender, to the Resend account owner.
const verifiedFrom = process.env.RESEND_FROM;
const from = verifiedFrom || "Bunker Box <onboarding@resend.dev>";
const segmentId = process.env.RESEND_SEGMENT_ID;

export const canNotify = Boolean(apiKey && to);

// Status code and error type of the last failed Resend call (no message text, which can contain addresses).
export let lastFailure = null;

const sleep = ms => new Promise(r => setTimeout(r, ms));

// One call to Resend, retried once on network errors, 429 and 5xx. Never throws.
async function resend(path, body, idempotencyKey) {
  const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(API + path, { method: "POST", headers, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) return { ok: true, data };
      const retryable = res.status === 429 || res.status >= 500;
      if (!retryable || attempt === 1) {
        console.error(`Resend ${path} failed`, res.status, data);
        lastFailure = `${res.status} ${data.name || "error"}`;
        return { ok: false, data };
      }
      const wait = Number(res.headers.get("retry-after")) * 1000 || 800;
      await sleep(Math.min(wait, 3000));
    } catch (err) {
      if (attempt === 1) { console.error(`Resend ${path} failed`, err); lastFailure = "network"; return { ok: false }; }
      await sleep(800);
    }
  }
  return { ok: false };
}

// Email to the team for each new signup. Returns true when Resend accepted it.
export async function notifySignup(record) {
  if (!canNotify) return false;
  const { ok, data } = await resend("/emails", {
    from,
    to: to.split(",").map(s => s.trim()).filter(Boolean),
    reply_to: record.email,
    template: {
      id: "signup-alert",
      variables: {
        NAME: record.name,
        SIGNUP_EMAIL: record.email,
        LEVEL: record.level || "Not given",
        POSITION: record.position ? `#${record.position}` : "Not recorded",
        JOINED: record.joinedAt
      }
    }
  }, `signup-alert/${record.email}/${record.joinedAt}`);
  if (ok) console.log("Signup alert sent", data.id);
  return ok;
}

// Welcome email to the person who joined. Only once the sending domain is verified.
export async function sendWelcome(record) {
  if (!apiKey || !verifiedFrom) return false;
  const { ok, data } = await resend("/emails", {
    from: verifiedFrom,
    to: record.email,
    template: {
      id: "welcome",
      variables: {
        NAME: record.name,
        POSITION_LINE: record.position ? `You're number ${record.position} on the board.` : ""
      }
    }
  }, `welcome/${record.email}`);
  if (ok) console.log("Welcome email sent", data.id);
  return ok;
}

// Add the person to the launch-day mailing list. They ticked the consent box to get here.
export async function addContact(record) {
  if (!apiKey || !segmentId) return false;
  const { ok } = await resend("/contacts", {
    email: record.email,
    first_name: record.name,
    unsubscribed: false,
    segments: [{ id: segmentId }]
  });
  return ok;
}
