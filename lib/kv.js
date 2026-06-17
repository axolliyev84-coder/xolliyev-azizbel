// Tiny Upstash/Vercel-KV (Redis) REST helper shared by the api functions.
// The DB credentials are injected automatically by Vercel when you connect a
// Redis/KV store to the project (Storage tab). We accept several env var names.
function clean(s) {
  return String(s || "").replace(/[^\x21-\x7E]/g, "");
}

export const sanitize = clean;

export function kvCreds() {
  const e = process.env;
  return {
    url: clean(e.KV_REST_API_URL || e.UPSTASH_REDIS_REST_URL || ""),
    token: clean(e.KV_REST_API_TOKEN || e.UPSTASH_REDIS_REST_TOKEN || ""),
  };
}

export function hasDb() {
  const { url, token } = kvCreds();
  return !!(url && token);
}

export async function redis(cmd) {
  const { url, token } = kvCreds();
  if (!url || !token) throw new Error("no-db");
  const r = await fetch(url, {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error("redis " + r.status);
  return r.json();
}
