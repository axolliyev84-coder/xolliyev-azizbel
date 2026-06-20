// Authentication + per-user profile/progress storage.
// Passwords are hashed (PBKDF2) and never stored in plain text. Sessions use a
// short signed token (HMAC-SHA256) — no third-party auth service, no extra cost.
// All secrets stay on the server: AUTH_SECRET env var signs tokens; the Redis
// connection (lib/kv.js) stores users. Falls back cleanly when not configured,
// so the site keeps working in guest mode.
import crypto from "crypto";
import { getUser, setUser, userExists, hasDb, normLogin, sanitize } from "../lib/kv.js";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function secret() {
  return sanitize(process.env.AUTH_SECRET || "");
}

/* ---- token (HMAC-signed, stateless) ---- */
function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlJson(obj) {
  return b64url(JSON.stringify(obj));
}
function hmac(body) {
  return crypto.createHmac("sha256", secret()).update(body).digest("hex");
}
function signToken(payload) {
  const body = b64urlJson(payload);
  return body + "." + hmac(body);
}
function verifyToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const i = token.lastIndexOf(".");
  const body = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = hmac(body);
  // constant-time compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let payload;
  try { payload = JSON.parse(Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()); }
  catch { return null; }
  if (!payload || !payload.exp || payload.exp < Date.now()) return null;
  return payload;
}

/* ---- password hashing (PBKDF2, built-in) ---- */
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(String(password), salt, 100000, 32, "sha256").toString("hex");
}
function makeSalt() {
  return crypto.randomBytes(16).toString("hex");
}

/* ---- public profile (never leaks hash/salt) ---- */
function publicProfile(rec) {
  return {
    login: rec.login,
    name: rec.name,
    plan: rec.plan || "free",
    createdAt: rec.createdAt || 0,
    prog: rec.prog || {},
    certs: rec.certs || [],
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!secret() || !hasDb()) {
    // Not configured yet — frontend falls back to guest mode.
    res.status(503).json({ error: "auth-unavailable" });
    return;
  }

  const body = req.body || {};
  const action = String(body.action || "");

  try {
    /* ---------- register ---------- */
    if (action === "register") {
      const login = normLogin(body.login);
      const name = sanitize(body.name || "").trim().slice(0, 40) || login;
      const password = String(body.password || "");
      if (login.length < 3) { res.status(400).json({ error: "login-short" }); return; }
      if (password.length < 6) { res.status(400).json({ error: "password-short" }); return; }
      if (await userExists(login)) { res.status(409).json({ error: "login-taken" }); return; }

      const salt = makeSalt();
      const rec = {
        login, name, salt,
        hash: hashPassword(password, salt),
        plan: "free",
        createdAt: Date.now(),
        prog: (body.prog && typeof body.prog === "object") ? body.prog : {},
        certs: [],
      };
      await setUser(login, rec);
      const token = signToken({ login, name, exp: Date.now() + TOKEN_TTL_MS });
      res.status(200).json({ token, profile: publicProfile(rec) });
      return;
    }

    /* ---------- login ---------- */
    if (action === "login") {
      const login = normLogin(body.login);
      const password = String(body.password || "");
      const rec = await getUser(login);
      if (!rec || !rec.salt || !rec.hash) { res.status(401).json({ error: "bad-credentials" }); return; }
      const attempt = hashPassword(password, rec.salt);
      const ok = attempt.length === rec.hash.length &&
        crypto.timingSafeEqual(Buffer.from(attempt), Buffer.from(rec.hash));
      if (!ok) { res.status(401).json({ error: "bad-credentials" }); return; }
      const token = signToken({ login: rec.login, name: rec.name, exp: Date.now() + TOKEN_TTL_MS });
      res.status(200).json({ token, profile: publicProfile(rec) });
      return;
    }

    /* ---------- me (restore session) ---------- */
    if (action === "me") {
      const payload = verifyToken(body.token);
      if (!payload) { res.status(401).json({ error: "invalid-token" }); return; }
      const rec = await getUser(payload.login);
      if (!rec) { res.status(401).json({ error: "no-user" }); return; }
      res.status(200).json({ profile: publicProfile(rec) });
      return;
    }

    /* ---------- save progress ---------- */
    if (action === "saveProgress") {
      const payload = verifyToken(body.token);
      if (!payload) { res.status(401).json({ error: "invalid-token" }); return; }
      const rec = await getUser(payload.login);
      if (!rec) { res.status(401).json({ error: "no-user" }); return; }
      if (body.prog && typeof body.prog === "object") rec.prog = body.prog;
      await setUser(rec.login, rec);
      res.status(200).json({ ok: true });
      return;
    }

    /* ---------- issue a certificate record ---------- */
    if (action === "addCert") {
      const payload = verifyToken(body.token);
      if (!payload) { res.status(401).json({ error: "invalid-token" }); return; }
      const rec = await getUser(payload.login);
      if (!rec) { res.status(401).json({ error: "no-user" }); return; }
      const cert = {
        id: crypto.randomBytes(8).toString("hex"),
        topic: sanitize(body.topic || "").slice(0, 80),
        score: Number(body.score) || 0,
        ts: Date.now(),
      };
      rec.certs = Array.isArray(rec.certs) ? rec.certs : [];
      rec.certs.unshift(cert);
      rec.certs = rec.certs.slice(0, 50);
      await setUser(rec.login, rec);
      res.status(200).json({ ok: true, cert });
      return;
    }

    res.status(400).json({ error: "unknown-action" });
  } catch (e) {
    res.status(500).json({ error: "server-error" });
  }
}
