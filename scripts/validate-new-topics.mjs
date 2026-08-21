// Yangi mavzu fayllarini strukturaviy tekshiradi (Block/HW komponentlari bilan mosligi, indekslar, id to'qnashuvlari)
import fs from "fs";
const DIR = "C:/Users/shaxz/Claude/Projects/МСФО  tuliq urganish/YANGI-MAVZULAR/";
const KINDS = new Set(["p","ul","ol","def","formula","note","warn"]);
const HWK = new Set(["solve","fill","classify"]);
const cur = fs.readFileSync("src/course-data.js","utf8");
const existingIds = new Set([...cur.matchAll(/id:"([a-z0-9]+)", code/g)].map(m=>m[1]));
const existingHw = new Set([...cur.matchAll(/id:"([a-z0-9_]+)", kind/g)].map(m=>m[1]));
const seenIds = new Set(), seenHw = new Set(), seenCodes = new Set();
let problems = 0; const report = [];
const files = fs.readdirSync(DIR).filter(f=>f.endsWith(".js")).sort();
const summary = [];
for (const f of files) {
  let s = fs.readFileSync(DIR+f,"utf8"); if (s.charCodeAt(0)===0xFEFF) s=s.slice(1);
  const ex = /export\s*\{\s*(\w+)\s*,\s*(\w+)\s*\}/.exec(s);
  if (!ex) { report.push(`${f}: EXPORT topilmadi`); problems++; continue; }
  const [_, T, H] = ex;
  let obj;
  try { obj = eval(s.replace(/export\s*\{[^}]*\};?/, "") + `; ({t:${T}, h:${H}})`); }
  catch(e) { report.push(`${f}: SINTAKSIS XATO: ${e.message}`); problems++; continue; }
  const t = obj.t, h = obj.h; const P = (m)=>{report.push(`${f} [${t.code}]: ${m}`); problems++;};
  for (const k of ["id","code","title","ground"]) if (typeof t[k]!=="string"||!t[k]) P(`${k} yo'q`);
  if (existingIds.has(t.id)||seenIds.has(t.id)) P(`id to'qnashuvi: ${t.id}`); seenIds.add(t.id);
  if (seenCodes.has(t.code)) P(`code takror: ${t.code}`); seenCodes.add(t.code);
  if (!Array.isArray(t.theory)||!t.theory.length) P("theory bo'sh");
  (t.theory||[]).forEach((sec,i)=>{ if(!sec.title||!Array.isArray(sec.blocks)) P(`theory[${i}] title/blocks yo'q`);
    (sec.blocks||[]).forEach((b,j)=>{ if(!KINDS.has(b.k)) P(`theory[${i}].blocks[${j}] noma'lum k="${b.k}"`);
      if(b.k==="def"&&(!b.term||!b.v)) P(`theory[${i}].blocks[${j}] def: term/v yo'q`);
      if((b.k==="ul"||b.k==="ol")&&!Array.isArray(b.v)) P(`theory[${i}].blocks[${j}] ${b.k}: v massiv emas`);
      if(["p","formula","note","warn"].includes(b.k)&&typeof b.v!=="string") P(`theory[${i}].blocks[${j}] ${b.k}: v string emas`); }); });
  if (!Array.isArray(t.cards)||!t.cards.length) P("cards bo'sh");
  (t.cards||[]).forEach((c,i)=>{ if(!Array.isArray(c)||c.length!==2||!c[0]||!c[1]) P(`cards[${i}] [q,a] emas`); });
  (t.examples||[]).forEach((e,i)=>{ if(!e.title||!e.problem||!Array.isArray(e.steps)||!e.steps.length||!e.answer) P(`examples[${i}] to'liq emas`);
    (e.steps||[]).forEach((st,j)=>{ if(!Array.isArray(st)||st.length!==2) P(`examples[${i}].steps[${j}] [t,d] emas`); }); });
  if (!Array.isArray(t.quiz)||!t.quiz.length) P("quiz bo'sh");
  (t.quiz||[]).forEach((q,i)=>{ if(q.type!=="mcq") P(`quiz[${i}] type!=mcq`); if(!Array.isArray(q.options)||q.options.length<2) P(`quiz[${i}] options`);
    else { if(!(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length)) P(`quiz[${i}] correct=${q.correct} chegaradan tashqari`);
      if(new Set(q.options).size!==q.options.length) P(`quiz[${i}] takroriy variant`); }
    if(!q.q) P(`quiz[${i}] q yo'q`); if(!q.explain) P(`quiz[${i}] explain yo'q`); });
  (t.homeworks||[]).forEach((hw,i)=>{ if(!hw.id) P(`homeworks[${i}] id yo'q`); if(existingHw.has(hw.id)||seenHw.has(hw.id)) P(`hw id to'qnashuvi: ${hw.id}`); seenHw.add(hw.id);
    if(!HWK.has(hw.kind)) P(`homeworks[${i}] kind="${hw.kind}" noma'lum`);
    if(hw.kind==="solve"&&(!hw.cond||!Array.isArray(hw.steps)||!hw.answer)) P(`homeworks[${i}] solve: cond/steps/answer yo'q`);
    if(hw.kind==="fill"){ if(!hw.cond) P(`homeworks[${i}] fill: cond yo'q`); if(!Array.isArray(hw.items)&&!Array.isArray(hw.lines)) P(`homeworks[${i}] fill: items/lines yo'q`); }
    if(hw.kind==="classify"&&(!Array.isArray(hw.items)||hw.answerIn===undefined||hw.answerOut===undefined)) P(`homeworks[${i}] classify: items/answerIn/answerOut yo'q`); });
  if (!Array.isArray(h)||!h.length) P(`${H} bo'sh`);
  (h||[]).forEach((p,i)=>{ if(p.code!==t.code) P(`${H}[${i}] code "${p.code}" != "${t.code}"`); if(p.level!=="сложно") P(`${H}[${i}] level="${p.level}"`);
    if(!p.title||!p.problem||!Array.isArray(p.steps)||!p.steps.length||!p.answer) P(`${H}[${i}] to'liq emas`); });
  const hwShapes=(t.homeworks||[]).map(hw=>hw.kind+":"+Object.keys(hw).filter(k=>!["id","kind","title","cond"].includes(k)).join("+")).join(" | ");
  summary.push(`${t.code.padEnd(18)} id=${t.id.padEnd(9)} th=${t.theory.length} cards=${t.cards.length} quiz=${t.quiz.length} ex=${(t.examples||[]).length} hw=${(t.homeworks||[]).length} [${hwShapes}] hard=${h.length}`);
}
console.log(summary.join("\n"));
console.log("\n=== MUAMMOLAR: "+problems+" ===");
report.forEach(r=>console.log(" - "+r));
