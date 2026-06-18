// Redis helper shared by the api functions. The Vercel "Redis" integration
// injects a TCP connection string (REDIS_URL), so we use the node-redis client.
import { createClient } from "redis";

function clean(s) {
  return String(s || "").replace(/[^\x21-\x7E]/g, "");
}
export const sanitize = clean;

function redisUrl() {
  const e = process.env;
  let u = e.REDIS_URL || e.KV_URL || "";
  // Fallback for custom-prefixed names (e.g. STORAGE_REDIS_URL).
  if (!u) {
    for (const k in e) { if (/REDIS_URL$/.test(k) && e[k]) { u = e[k]; break; } }
  }
  return clean(u);
}

export function hasDb() {
  return !!redisUrl();
}

let _client = null;
async function client() {
  const url = redisUrl();
  if (!url) throw new Error("no-db");
  if (_client && _client.isOpen) return _client;
  _client = createClient({ url, socket: { connectTimeout: 5000 } });
  _client.on("error", () => {});
  await _client.connect();
  return _client;
}

const KEY = "mcfo_events";

export async function pushEvent(str) {
  const c = await client();
  await c.lPush(KEY, str);
  await c.lTrim(KEY, 0, 1999);
}

export async function listEvents(max) {
  const c = await client();
  return c.lRange(KEY, 0, (max || 2000) - 1);
}

export async function clearEvents() {
  const c = await client();
  return c.del(KEY);
}
