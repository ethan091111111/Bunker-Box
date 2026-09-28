import { redis, KEY } from "./_redis.js";

const csvCell = (v) => {
  const s = String(v ?? "");
  const safe = /^[=+\-@]/.test(s) ? "'" + s : s;
  return /[",\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const password = process.env.ADMIN_PASSWORD;
  if (!password || req.query.key !== password) {
    return res.status(401).send("Unauthorised");
  }

  try {
    const flat = (await redis("HGETALL", KEY)) || [];
    const rows = [];
    for (let i = 1; i < flat.length; i += 2) rows.push(JSON.parse(flat[i]));
    rows.sort((a, b) => (a.position || 0) - (b.position || 0));

    const header = ["position", "name", "email", "level", "joinedAt"];
    const csv = [header.join(","), ...rows.map((r) => header.map((h) => csvCell(r[h])).join(","))].join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="bunker-box-waitlist-${new Date().toISOString().slice(0, 10)}.csv"`);
    return res.status(200).send(csv);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Could not load the waiting list.");
  }
}
