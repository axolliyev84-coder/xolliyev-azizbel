// Records a user activity event into Redis (newest first, capped at 2000).
// No-op if the DB isn't connected yet, so the site keeps working regardless.
import { pushEvent, hasDb } from "../lib/kv.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!hasDb()) {
    res.status(200).json({ ok: false, reason: "no-db" });
    return;
  }
  try {
    const b = req.body || {};
    const ev = JSON.stringify({
      u: String(b.u || "").slice(0, 40),
      t: String(b.t || "").slice(0, 20),
      d: String(b.d || "").slice(0, 80),
      cards: Number(b.cards) || 0,
      avg: Number(b.avg) || 0,
      ts: Date.now(),
    });
    await pushEvent(ev);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(200).json({ ok: false });
  }
}
