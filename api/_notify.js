const apiKey = process.env.RESEND_API_KEY;
const to = process.env.NOTIFY_EMAIL;
const from = process.env.NOTIFY_FROM || "Bunker Box <onboarding@resend.dev>";

export const canNotify = Boolean(apiKey && to);

export async function notifySignup(record) {
  if (!canNotify) return false;
  const lines = [
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Plays: ${record.level || "Not given"}`,
    record.position ? `Place in queue: #${record.position}` : null,
    `Joined: ${record.joinedAt}`
  ].filter(Boolean);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map(s => s.trim()).filter(Boolean),
        reply_to: record.email,
        subject: `New Bunker Box signup: ${record.name}`,
        text: `Someone just joined the Bunker Box waiting list.\n\n${lines.join("\n")}\n`
      })
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return true;
  } catch (err) {
    console.error("Signup email failed", err);
    return false;
  }
}
