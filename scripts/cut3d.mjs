// 3D ikonkalarning kulrang studiya fonini olib tashlaydi.
// Qoida: neytral kulrang (past to'yinganlik, o'rta yorug'lik) = FON -> shaffof.
// Rangli ikonka (yuqori to'yinganlik), oq porlash (juda yorug') va to'q chiziqlar saqlanadi.
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

const SAT_MAX = 40;   // shundan past to'yinganlik = neytral kulrang
const LUM_LO = 55;    // bundan qorong'i = saqlanadi (to'q chiziqlar)
const LUM_HI = 242;   // bundan yorug' = saqlanadi (oq porlash)

for (const [name, url] of Object.entries(ICONS)) {
  const tmp = `public/3d/_${name}.png`;
  await dl(url, tmp);
  const { data, info } = await sharp(tmp).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  let cut = 0;
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    if (mx - mn < SAT_MAX && mx > LUM_LO && mx < LUM_HI) { data[i + 3] = 0; cut++; }
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: ch } })
    .resize(256, 256, { fit: "inside" })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(`public/3d/${name}.webp`);
  fs.unlinkSync(tmp);
  console.log("cut", name, "transparent%=" + Math.round(100 * cut / (info.width * info.height)));
}
console.log("done");
