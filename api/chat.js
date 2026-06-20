// Vercel Serverless Function — proxies requests to the Anthropic API.
// The API key lives ONLY on the server (env var ANTHROPIC_KEY) and is never
// sent to the browser. The frontend calls /api/chat instead of api.anthropic.com.
//
// Himoya (xarajatdan saqlash):
//  1) Origin tekshiruvi — faqat o'z saytimizdan.
//  2) Kirish (ism) talab qilinadi.
//  3) Kunlik limitlar (Redis): har bir foydalanuvchiga + umumiy byudjet to'sig'i.
import { bumpCounter, hasDb } from "../lib/kv.js";

const USER_DAILY = Number(process.env.AI_USER_DAILY || 40);      // bir o'quvchiga / kun
const GLOBAL_DAILY = Number(process.env.AI_GLOBAL_DAILY || 600); // umumiy / kun (byudjet to'sig'i)

function dayKey() {
  const d = new Date();
  return (
    d.getUTCFullYear() +
    "-" + String(d.getUTCMonth() + 1).padStart(2, "0") +
    "-" + String(d.getUTCDate()).padStart(2, "0")
  );
}

// Yumshoq origin tekshiruvi: manba bo'lsa va begona bo'lsa — bloklaymiz.
// Manba umuman bo'lmasa o'tkazamiz (limitlar baribir byudjetni himoya qiladi).
function originOk(req) {
  const host = req.headers.host || "";
  const src = req.headers.origin || req.headers.referer || "";
  if (!src) return true;
  try {
    const h = new URL(src).host;
    return (
      h === host ||
      h.endsWith(".vercel.app") ||
      h.startsWith("localhost") ||
      h.startsWith("127.0.0.1")
    );
  } catch {
    return true;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // 1) Faqat o'z saytimizdan
  if (!originOk(req)) {
    res.status(403).json({ error: "Доступ запрещён" });
    return;
  }

  // Ko'rinmas belgilarni (BOM, bo'shliq, yangi qator) tozalaymiz — kalit faqat ASCII.
  const key = (process.env.ANTHROPIC_KEY || "").replace(/[^\x21-\x7E]/g, "");
  if (!key) {
    res.status(500).json({ error: "ANTHROPIC_KEY is not configured on the server" });
    return;
  }

  try {
    const { prompt, ground, maxTokens, user } = req.body || {};
    if (!prompt) {
      res.status(400).json({ error: "prompt is required" });
      return;
    }

    // 2) Kirish kerak (ism). Kiril/lotin harflar va oddiy belgilarga ruxsat.
    const u = String(user || "")
      .replace(/[^\x20-\x7EЀ-ӿ]/g, "")
      .trim()
      .slice(0, 40);
    if (!u) {
      res.status(403).json({ error: "Войдите, чтобы пользоваться ИИ-репетитором." });
      return;
    }

    // 3) Kunlik limitlar (Redis bo'lsa). Har kuni UTC bo'yicha tiklanadi.
    if (hasDb()) {
      try {
        const day = dayKey();
        const TTL = 90000; // ~25 soat
        const userCount = await bumpCounter("ai_user:" + day + ":" + u.toLowerCase(), TTL);
        if (userCount > USER_DAILY) {
          res.status(429).json({
            error: "Вы исчерпали дневной лимит вопросов ИИ (" + USER_DAILY + "). Попробуйте завтра.",
          });
          return;
        }
        const globalCount = await bumpCounter("ai_calls:" + day, TTL);
        if (globalCount > GLOBAL_DAILY) {
          res.status(429).json({
            error: "Дневной лимит ИИ-запросов исчерпан. Попробуйте завтра.",
          });
          return;
        }
      } catch {
        // Redis ishlamasa — oddiy ishlashni to'xtatmaymiz.
      }
    }

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: Math.min(Number(maxTokens) || 900, 2000),
        system:
          "Ты — преподаватель МСФО для начинающего, по-русски, кратко и по делу. " +
          (ground || ""),
        messages: [{ role: "user", content: String(prompt) }],
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: data?.error?.message || "Anthropic API error" });
      return;
    }

    const text = (data.content || [])
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n");
    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
}
