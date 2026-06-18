import sharp from "sharp";
import { mkdirSync } from "fs";

mkdirSync("public", { recursive: true });

const spark =
  "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z";

function svg(size, rx, frac) {
  const c = size / 2;
  const s = (size * frac) / 24;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#11876F"/><stop offset="1" stop-color="#0A5A4B"/></linearGradient></defs>
  <rect width="${size}" height="${size}" rx="${rx}" fill="url(#g)"/>
  <g transform="translate(${c},${c}) scale(${s}) translate(-12,-12)"><path d="${spark}" fill="#ffffff"/></g>
</svg>`;
}

async function gen(name, size, rx, frac) {
  await sharp(Buffer.from(svg(size, rx, frac))).png().toFile("public/" + name);
  console.log("wrote public/" + name);
}

await gen("icon-192.png", 192, Math.round(192 * 0.22), 0.52);
await gen("icon-512.png", 512, Math.round(512 * 0.22), 0.52);
await gen("icon-maskable-512.png", 512, 0, 0.44);
await gen("apple-touch-icon.png", 180, 0, 0.5);
await gen("favicon-32.png", 32, 6, 0.6);
console.log("done");
