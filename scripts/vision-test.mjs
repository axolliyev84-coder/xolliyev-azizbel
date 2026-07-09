// Haqiqiy vision testi: tartibsiz "qo'lyozma" rasm yasab, Anthropic'ka
// api/chat.js yasaydigan AYNAN bir xil multimodal formatda yuboradi.
// AI raqamlarni to'g'ri o'qib, tartiblab, tekshirishini sinaydi.
import sharp from "sharp";
import fs from "fs";

// Kalit .env dan (chop etilmaydi)
const env = fs.readFileSync(".env", "utf8");
const KEY = (/ANTHROPIC_KEY\s*=\s*"?([^"\r\n]+)"?/.exec(env) || [])[1]?.replace(/[^\x21-\x7E]/g, "");
if (!KEY) { console.error("kalit topilmadi"); process.exit(1); }

// Tartibsiz varaq: yozuvlar har xil burchakda, sochilgan, biri o'chirilgan
const svg = `<svg width="1400" height="1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="1400" height="1000" fill="#faf8f0"/>
  <g font-family="Segoe Script, Comic Sans MS, cursive" fill="#1a2340">
    <text x="720" y="180" font-size="52" transform="rotate(-4 720 180)">ЧСР = 300 - 40 - 20</text>
    <text x="150" y="820" font-size="60" transform="rotate(2 150 820)">ЧСР = 240</text>
    <text x="120" y="300" font-size="46" transform="rotate(-2 120 300)">себестоимость 70</text>
    <text x="640" y="560" font-size="46" transform="rotate(3 640 560)">70 - 65 = 5 списание</text>
    <text x="950" y="760" font-size="40" transform="rotate(-6 950 760)">запас в балансе 65</text>
    <text x="180" y="520" font-size="44" fill="#8a8a8a" transform="rotate(-3 180 520)">250</text>
    <line x1="160" y1="505" x2="290" y2="510" stroke="#8a8a8a" stroke-width="4"/>
  </g>
</svg>`;

const buf = await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toBuffer();
console.log("rasm:", Math.round(buf.length / 1024), "KB");

const prompt = "Студент прислал фото своего рукописного решения (записи в беспорядке). ШАГ 1: расшифруй ВСЁ содержимое фото и собери записи в логический порядок. ШАГ 2: проверь расчёты. Эталон: ЧСР = 300 − 40 − 20 = 240; списание = 70 − 65 = 5. Ответь кратко: что написано (по порядку) и верны ли числа. Зачёркнутое не учитывай.";

// Rejim: URL argument berilsa — jonli /api/chat orqali (to'liq end-to-end); bo'lmasa — to'g'ridan-to'g'ri Anthropic
const URL_ARG = process.argv[2];
let r, textOf;
if (URL_ARG) {
  r = await fetch(URL_ARG.replace(/\/$/, "") + "/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt, ground: "Проверка рукописных решений по МСФО (IAS 2).", maxTokens: 700, user: "vision-test",
      images: [{ media_type: "image/jpeg", data: buf.toString("base64"), label: "Фото решения" }],
    }),
  });
  textOf = (d) => d.text || d.error || "(bo'sh)";
} else {
  const content = [
    { type: "text", text: prompt },
    { type: "text", text: "\nФото решения:" },
    { type: "image", source: { type: "base64", media_type: "image/jpeg", data: buf.toString("base64") } },
  ];
  r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: 700,
      system: "Ты — преподаватель МСФО для начинающего, по-русски, кратко и по делу. Проверка рукописных решений по МСФО (IAS 2).",
      messages: [{ role: "user", content }],
    }),
  });
  textOf = (d) => (d.content || []).map((b) => (b.type === "text" ? b.text : "")).join("\n") || (d.error && d.error.message) || "(bo'sh)";
}
console.log("status:", r.status);
const d = await r.json().catch(() => ({}));
const text = textOf(d);
console.log("--- AI JAVOBI ---");
console.log(text);
console.log("--- TEKSHIRUV ---");
console.log("240 o'qildi:", /240/.test(text));
console.log("5 (spisaniye) o'qildi:", /70\s*[−-]\s*65|списан/i.test(text));
console.log("o'chirilgan 250 e'tiborsiz:", !/250/.test(text) ? "ha (yaxshi)" : "yo'q (250 tilga olingan - matnini tekshiring)");
