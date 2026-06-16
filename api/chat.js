// Vercel Serverless Function — proxies requests to the Anthropic API.
// The API key lives ONLY on the server (env var ANTHROPIC_KEY) and is never
// sent to the browser. The frontend calls /api/chat instead of api.anthropic.com.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Ko'rinmas belgilarni (BOM, bo'shliq, yangi qator) tozalaymiz — kalit faqat ASCII.
  const key = (process.env.ANTHROPIC_KEY || "").replace(/[^\x21-\x7E]/g, "");
  if (!key) {
    res.status(500).json({ error: "ANTHROPIC_KEY is not configured on the server" });
    return;
  }

  try {
    const { prompt, ground, maxTokens } = req.body || {};
    if (!prompt) {
      res.status(400).json({ error: "prompt is required" });
      return;
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
