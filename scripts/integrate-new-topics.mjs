// 10 yangi mavzuni src/course-data.js ga joylaydi (dizaynga tegmaydi).
// - IFRS16 uy vazifasi idlari i16_hw* -> if16_hw* (IAS 16 bilan to'qnashmasin)
// - TOPICS: brief'dagi tavsiya tartibi
// - HARD_PROBLEMS oxiriga 10 ta XXX_HARD yoyiladi
import fs from "fs";
const DIR = "C:/Users/shaxz/Claude/Projects/МСФО  tuliq urganish/YANGI-MAVZULAR/";
const CUR = "src/course-data.js";
const BAK = process.env.TEMP + "/course-data.before-10topics.js";
let cur = fs.readFileSync(CUR, "utf8"); if (cur.charCodeAt(0) === 0xFEFF) cur = cur.slice(1);
fs.writeFileSync(BAK, cur, "utf8");
if (cur.includes("const IAS7 ") || cur.includes('id:"ias7"')) { console.error("ABORT: IAS7 allaqachon bor"); process.exit(1); }

const files = fs.readdirSync(DIR).filter(f => f.endsWith(".js")).sort();
const names = [], hardNames = [], blocks = [];
for (const f of files) {
  let s = fs.readFileSync(DIR + f, "utf8"); if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1);
  const ex = /export\s*\{\s*(\w+)\s*,\s*(\w+)\s*\};?/.exec(s);
  if (!ex) { console.error("EXPORT yo'q:", f); process.exit(1); }
  names.push(ex[1]); hardNames.push(ex[2]);
  s = s.replace(ex[0], "").trimEnd();
  if (ex[1] === "IFRS16") { const before = s; s = s.replace(/id:"i16_hw(\d+)"/g, 'id:"if16_hw$1"'); if (s === before) { console.error("IFRS16 hw id rename bo'lmadi"); process.exit(1); } }
  blocks.push(`/* ---------- ${f} ---------- */\n` + s);
}
const ORDER = ["CONCEPT","IAS1","IAS2","IAS7","IAS16","IAS23","IAS36","IAS37","IAS38","IAS40","IAS12","IAS21","IAS28","IAS33","FININSTR","IFRS5","IFRS15","IFRS16","KONSOL"];
for (const n of names) if (!ORDER.includes(n)) { console.error("ORDER da yo'q:", n); process.exit(1); }

// 1) mavzular: TOPICS qatoridan oldin
const TL = "const TOPICS = [CONCEPT, IAS1, IAS2, IAS16, IAS23, IAS36, IAS37, IAS38, IAS40];";
if (!cur.includes(TL)) { console.error("TOPICS qatori topilmadi"); process.exit(1); }
cur = cur.replace(TL, blocks.join("\n\n") + "\n\n/* O'quv mantig'i bo'yicha tartib */\nconst TOPICS = [" + ORDER.join(", ") + "];");

// 2) HARD_PROBLEMS oxiriga yoyish
const hs = cur.indexOf("const HARD_PROBLEMS = [");
const he = cur.indexOf("\n];", hs);
if (hs < 0 || he < 0) { console.error("HARD_PROBLEMS chegarasi topilmadi"); process.exit(1); }
cur = cur.slice(0, he) + "\n  /* --- yangi mavzularning qiyin masalalari --- */\n  " + hardNames.map(h => "..." + h).join(", ") + "," + cur.slice(he);
fs.writeFileSync(CUR, cur, "utf8");

// 3) tekshiruv: modulni eval qilib sanaymiz
const code = cur.replace(/export\s*\{[^}]*\};?/, "") + "\n;({TOPICS, HARD_PROBLEMS, EXAM_PROBLEMS, EXAM_TEST_POOL, TMAP})";
const M = eval(code);
const ids = M.TOPICS.map(t => t.id);
console.log("TOPICS:", M.TOPICS.length, "->", M.TOPICS.map(t => t.code).join(" | "));
console.log("id takror yo'q:", new Set(ids).size === ids.length);
console.log("HARD_PROBLEMS:", M.HARD_PROBLEMS.length, "(edi 45, kutilgan 95)");
console.log("EXAM_PROBLEMS (barcha masalalar):", M.EXAM_PROBLEMS.length);
console.log("EXAM_TEST_POOL (смешанный тест):", M.EXAM_TEST_POOL.length);
console.log("kartochkalar:", M.TOPICS.reduce((s, t) => s + t.cards.length, 0), "| quiz:", M.TOPICS.reduce((s, t) => s + t.quiz.length, 0));
const hwIds = M.TOPICS.flatMap(t => t.homeworks.map(h => h.id));
console.log("hw id takror yo'q:", new Set(hwIds).size === hwIds.length, "| IFRS16 hw:", M.TMAP.ifrs16.homeworks.map(h => h.id).join(","));
console.log("export saqlangan:", cur.includes("export { fmt, TOPICS, TMAP, HARD_PROBLEMS, EXTRA_TESTS, EXAM_PROBLEMS, EXAM_TEST_POOL };"));
console.log("dizayn kodi yo'q:", !/className=|function HomeView|const CSS=/.test(cur));
