// ABCO — «Подготовка к экзамену» barcha javoblarini Excel (.xlsx) qiladi.
// Ishga tushirish: npm install exceljs --no-save  &&  node scripts/build_xlsx.mjs
import fs from "fs";
import ExcelJS from "exceljs";

let s = fs.readFileSync("src/exam-variants.js", "utf8");
if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1);
const a = s.indexOf("const EXAM_VARIANTS"), b = s.indexOf("const PREP_VARIANTS");
const V = eval(s.slice(a, b) + "; EXAM_VARIANTS");
const OUT = "C:/Users/shaxz/OneDrive/Desktop/ABCO-imtihon-javoblari.xlsx";

const NAVY = "FF2A4275", ORANGE_LT = "FFFDEEDD", GREEN = "FF1A7A44", ZEBRA = "FFF6F8FC";
const FONT = "Arial";
const wb = new ExcelJS.Workbook();
wb.creator = "ABCO Academy"; wb.created = new Date();

const thin = { style: "thin", color: { argb: "FFD3DBEA" } };
const border = { top: thin, left: thin, bottom: thin, right: thin };

function styleHeaderRow(row) {
  row.eachCell(c => {
    c.font = { name: FONT, bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
    c.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    c.border = border;
  });
  row.height = 26;
}
function sectionRow(ws, r, text, span, fill) {
  ws.mergeCells(r, 1, r, span);
  const c = ws.getCell(r, 1);
  c.value = text;
  c.font = { name: FONT, bold: true, size: 11, color: { argb: NAVY } };
  c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: fill } };
  c.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  ws.getRow(r).height = 22;
}

/* ---------- ОБЗОР ---------- */
const ov = wb.addWorksheet("Обзор", { views: [{ state: "frozen", ySplit: 4 }] });
ov.mergeCells("A1:F1");
ov.getCell("A1").value = "ABCO Academy — ответы к пробным экзаменам (Подготовка к экзамену)";
ov.getCell("A1").font = { name: FONT, bold: true, size: 15, color: { argb: "FFFFFFFF" } };
ov.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
ov.getCell("A1").alignment = { vertical: "middle", horizontal: "center" };
ov.getRow(1).height = 34;
ov.mergeCells("A2:F2");
ov.getCell("A2").value = "Ключ для преподавателя. ВАЖНО: в тесте позиции вариантов перемешиваются для каждого студента — сверяйте по ТЕКСТУ верного ответа, а не по букве.";
ov.getCell("A2").font = { name: FONT, italic: true, size: 10, color: { argb: "FF8A2B00" } };
ov.getCell("A2").fill = { type: "pattern", pattern: "solid", fgColor: { argb: ORANGE_LT } };
ov.getCell("A2").alignment = { vertical: "middle", horizontal: "left", wrapText: true, indent: 1 };
ov.getRow(2).height = 30;
const ovHead = ov.getRow(4);
ovHead.values = ["Вариант", "Уровень", "Тестов", "Задач", "Макс. балл", "Порог сдачи"];
styleHeaderRow(ovHead);
V.forEach((v, i) => {
  const max = v.tests.length + v.problems.length * 4;
  const row = ov.getRow(5 + i);
  row.values = [v.title, v.level, v.tests.length, v.problems.length, max + " баллов", "60% (" + Math.ceil(max * 0.6) + " б.)"];
  row.eachCell(c => { c.font = { name: FONT, size: 10 }; c.border = border; c.alignment = { vertical: "middle", horizontal: "center" }; });
  row.getCell(1).font = { name: FONT, bold: true, size: 10, color: { argb: NAVY } };
  row.getCell(1).alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  row.getCell(2).alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  if (i % 2) row.eachCell(c => { c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ZEBRA } }; });
});
ov.columns = [{ width: 16 }, { width: 20 }, { width: 10 }, { width: 10 }, { width: 14 }, { width: 16 }];
const noteR = ov.getRow(5 + V.length + 1);
noteR.getCell(1).value = "Каждый тест — 1 балл, каждая задача — 4 балла (проверяет ИИ по числам и ходу решения).";
noteR.getCell(1).font = { name: FONT, italic: true, size: 9, color: { argb: "FF6A7A96" } };

/* ---------- Har variant ---------- */
V.forEach(v => {
  const ws = wb.addWorksheet(v.title, { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = [{ width: 5 }, { width: 9 }, { width: 52 }, { width: 34 }, { width: 62 }];
  let r = 1;
  ws.mergeCells(r, 1, r, 5);
  const tc = ws.getCell(r, 1);
  tc.value = v.title.toUpperCase() + " — " + v.level + "   ·   тесты 20×1 + задачи " + v.problems.length + "×4 = " + (20 + v.problems.length * 4) + " баллов";
  tc.font = { name: FONT, bold: true, size: 13, color: { argb: "FFFFFFFF" } };
  tc.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
  tc.alignment = { vertical: "middle", horizontal: "center" };
  ws.getRow(r).height = 30; r++;

  sectionRow(ws, r, "ТЕСТЫ (20 · по 1 баллу) — сверяйте по тексту ответа", 5, ORANGE_LT); r++;
  const th = ws.getRow(r);
  th.values = ["№", "Код", "Вопрос", "Верный ответ", "Пояснение"];
  styleHeaderRow(th); r++;
  v.tests.forEach((q, i) => {
    const row = ws.getRow(r);
    row.values = [i + 1, q.code, q.q, q.options[q.correct], q.explain || ""];
    row.eachCell(c => { c.font = { name: FONT, size: 10 }; c.border = border; c.alignment = { vertical: "top", wrapText: true }; });
    row.getCell(1).alignment = { vertical: "top", horizontal: "center" };
    row.getCell(2).alignment = { vertical: "top", horizontal: "center" };
    row.getCell(2).font = { name: FONT, size: 9, bold: true, color: { argb: NAVY } };
    row.getCell(4).font = { name: FONT, size: 10, bold: true, color: { argb: GREEN } };
    if (i % 2) row.eachCell(c => { c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ZEBRA } }; });
    r++;
  });
  r++;

  sectionRow(ws, r, "ЗАДАЧИ (" + v.problems.length + " · по 4 балла · с полным решением)", 5, ORANGE_LT); r++;
  const ph = ws.getRow(r);
  ph.values = ["№", "Код", "Название", "Итоговый ответ", "Ход решения (эталон)"];
  styleHeaderRow(ph); r++;
  v.problems.forEach((p, i) => {
    const steps = (p.steps || []).map((st, k) => (k + 1) + ") " + st[0] + ": " + st[1]).join("\n");
    const row = ws.getRow(r);
    row.values = [i + 1, p.code, p.title, p.answer, steps];
    row.eachCell(c => { c.font = { name: FONT, size: 10 }; c.border = border; c.alignment = { vertical: "top", wrapText: true }; });
    row.getCell(1).alignment = { vertical: "top", horizontal: "center" };
    row.getCell(2).alignment = { vertical: "top", horizontal: "center" };
    row.getCell(2).font = { name: FONT, size: 9, bold: true, color: { argb: NAVY } };
    row.getCell(3).font = { name: FONT, size: 10, bold: true };
    row.getCell(4).font = { name: FONT, size: 10, bold: true, color: { argb: GREEN } };
    if (i % 2) row.eachCell(c => { c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ZEBRA } }; });
    r++;
  });
});

await wb.xlsx.writeFile(OUT);
console.log("Yozildi:", OUT, "(" + Math.round(fs.statSync(OUT).size / 1024) + " KB)");
console.log("Varaqlar: Обзор +", V.length, "variant | 100 test + 30 masala javobi");
