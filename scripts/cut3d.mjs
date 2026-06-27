// 3D ikonkalarning studiya fonini olib tashlaydi.
// 1) Chetdan flood-fill: ULASHGAN fon (kulrang + oq + soya) -> shaffof; to'yingan ikonka chetida to'xtaydi.
// 2) Eng katta ulashgan noshaffof qism = IKONKA; qolgan barcha mayda nuqtalar o'chiriladi.
// 3) bbox bo'yicha qirqib 256 ga sig'diramiz.
// Tekshiruv sharp bilan (Read displayiga emas) — u opaque-ni ham checkerboardda ko'rsatadi.
import sharp from "sharp";
import https from "https";
import fs from "fs";

const B = "https://d8j0ntlcm91z4.cloudfront.net/user_3FN4NTp1LdiRSngEJCT581FfnFu/";
const ICONS = {
  coin: B + "hf_20260626_145226_84f7fbda-0178-4cdc-86b8-b7fe0e7f1314.png",
  chart: B + "hf_20260626_145350_56bdf4f8-f016-492c-9930-29da3625b91a.png",
  scale: B + "hf_20260626_145400_5292922b-5878-4419-b10b-8526a6a86849.png",
  cap: B + "hf_20260627_091013_b1e03401-37da-41ef-9222-938ebeadd5f8.png",
};

function dl(url, out) {
  return new Promise((res, rej) => {
    https.get(url, (r) => { const w = fs.createWriteStream(out); r.pipe(w); w.on("finish", res); }).on("error", rej);
  });
}

const SAT_MAX = 72;
const STEP = 34;

for (const [name, url] of Object.entries(ICONS)) {
  const tmp = `public/3d/_${name}.png`;
  await dl(url, tmp);
  const { data, info } = await sharp(tmp).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, ch = info.channels, N = W * H;
  const sat = (p) => { const r = data[p * ch], g = data[p * ch + 1], b = data[p * ch + 2]; return Math.max(r, g, b) - Math.min(r, g, b); };
  const diff = (p, q) => Math.abs(data[p * ch] - data[q * ch]) + Math.abs(data[p * ch + 1] - data[q * ch + 1]) + Math.abs(data[p * ch + 2] - data[q * ch + 2]);

  // 1) flood-fill fon -> alpha 0
  const visited = new Uint8Array(N);
  const queue = new Int32Array(N);
  let tail = 0, head = 0;
  const seed = (p) => { if (!visited[p] && sat(p) < SAT_MAX) { visited[p] = 1; queue[tail++] = p; } };
  for (let x = 0; x < W; x++) { seed(x); seed((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { seed(y * W); seed(y * W + (W - 1)); }
  while (head < tail) {
    const p = queue[head++];
    data[p * ch + 3] = 0;
    const x = p % W, y = (p / W) | 0;
    const tryN = (q) => { if (!visited[q] && sat(q) < SAT_MAX && diff(p, q) < STEP) { visited[q] = 1; queue[tail++] = q; } };
    if (x > 0) tryN(p - 1); if (x < W - 1) tryN(p + 1);
    if (y > 0) tryN(p - W); if (y < H - 1) tryN(p + W);
  }

  // 1b) tuzoqqa tushgan neytral-kulrang halolarni global tozalash (oq porlash + to'q chiziqlar saqlanadi)
  for (let p = 0; p < N; p++) {
    if (data[p * ch + 3] === 0) continue;
    const r = data[p * ch], g = data[p * ch + 1], b = data[p * ch + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    if (mx - mn < 30 && mx > 70 && mx < 238) data[p * ch + 3] = 0;
  }

  // 2) barcha ulashgan qismlarni topamiz; YETARLICHA KATTALARINI saqlaymiz (chart ustun+strelka kabi
  //    bir nechta ajralgan qism bo'lsa ham qoladi), faqat MAYDA nuqtalar (speckle) o'chadi
  const lab = new Int32Array(N).fill(-1);
  const comps = [];
  const q2 = new Int32Array(N);
  for (let s = 0; s < N; s++) {
    if (lab[s] !== -1 || data[s * ch + 3] === 0) continue;
    let t = 0, h = 0; q2[t++] = s; lab[s] = 1; const comp = [s];
    while (h < t) {
      const p = q2[h++]; const x = p % W, y = (p / W) | 0;
      const tryN = (q) => { if (lab[q] === -1 && data[q * ch + 3] !== 0) { lab[q] = 1; q2[t++] = q; comp.push(q); } };
      if (x > 0) tryN(p - 1); if (x < W - 1) tryN(p + 1);
      if (y > 0) tryN(p - W); if (y < H - 1) tryN(p + W);
    }
    comps.push(comp);
  }
  let maxSize = 0; for (const c of comps) if (c.length > maxSize) maxSize = c.length;
  const TH = Math.max(220, maxSize * 0.05); // 220px yoki eng kattaning 5% — ikonka qismlari qoladi, nuqtalar o'chadi
  const keep = new Uint8Array(N);
  for (const c of comps) if (c.length >= TH) for (const p of c) keep[p] = 1;
  for (let p = 0; p < N; p++) {
    if (!keep[p]) { data[p * ch + 3] = 0; }
    if (data[p * ch + 3] === 0) { data[p * ch] = 0; data[p * ch + 1] = 0; data[p * ch + 2] = 0; }
  }

  // 3) chet de-fringe: tashqi kulrang/yarim-shaffof halqani peel qilish (qora fonda halo ko'rinmasin)
  for (let it = 0; it < 2; it++) {
    const rm = [];
    for (let p = 0; p < N; p++) {
      const aP = data[p * ch + 3];
      if (aP === 0) continue;
      const x = p % W, y = (p / W) | 0;
      const isEdge = (x > 0 && data[(p - 1) * ch + 3] === 0) || (x < W - 1 && data[(p + 1) * ch + 3] === 0) ||
        (y > 0 && data[(p - W) * ch + 3] === 0) || (y < H - 1 && data[(p + W) * ch + 3] === 0);
      if (!isEdge) continue;
      const r = data[p * ch], g = data[p * ch + 1], b = data[p * ch + 2];
      const s = Math.max(r, g, b) - Math.min(r, g, b);
      if (s < 55 || aP < 210) rm.push(p); // kulrang yoki yarim-shaffof chet -> olib tashlash
    }
    for (const p of rm) { data[p * ch + 3] = 0; data[p * ch] = 0; data[p * ch + 1] = 0; data[p * ch + 2] = 0; }
  }

  await sharp(data, { raw: { width: W, height: H, channels: ch } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 })
    .resize(256, 256, { fit: "inside" })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(`public/3d/${name}.webp`);
  fs.unlinkSync(tmp);

  const { data: vd, info: vi } = await sharp(`public/3d/${name}.webp`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const a = (x, y) => vd[(y * vi.width + x) * vi.channels + 3];
  console.log("cut", name, "size=" + vi.width + "x" + vi.height,
    "corners[TL,TR,BL,BR]=", [a(2, 2), a(vi.width - 3, 2), a(2, vi.height - 3), a(vi.width - 3, vi.height - 3)].join(","),
    "KB=" + Math.round(fs.statSync(`public/3d/${name}.webp`).size / 1024));
}
console.log("done");
