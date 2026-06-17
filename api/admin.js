// Returns recent activity events for the admin panel. Password-protected via
// the ADMIN_PASSWORD env var (compared against the x-admin-key header).
import { listEvents, hasDb, sanitize } from "../lib/kv.js";

export default async function handler(req, res) {
  const pass = sanitize(process.env.ADMIN_PASSWORD || "");
  const given = sanitize(req.headers["x-admin-key"] || (req.query && req.query.key) || "");

  if (!pass) {
    res.status(500).json({ error: "ADMIN_PASSWORD не задан на сервере" });
    return;
  }
  if (given !== pass) {
    res.status(401).json({ error: "Неверный пароль" });
    return;
  }
  if (!hasDb()) {
    res.status(200).json({ events: [], db: false });
    return;
  }
  try {
    const raw = await listEvents(2000);
    const events = raw
      .map((s) => { try { return JSON.parse(s); } catch { return null; } })
      .filter(Boolean);
    res.status(200).json({ events, db: true });
  } catch (e) {
    res.status(500).json({ error: "Ошибка чтения данных" });
  }
}
