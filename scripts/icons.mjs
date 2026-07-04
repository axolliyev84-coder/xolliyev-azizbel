// ABCO uslubidagi PWA ikonkalarini yaratadi (navy gradient + orange "abco" pill).
// Chiqish: public/icon-512.png, icon-192.png, icon-maskable-512.png, apple-touch-icon.png (180), favicon-32.png
import sharp from "sharp";

const NAVY1 = "#2E4A85", NAVY2 = "#14264E", ORANGE = "#F2913A";

function mainSvg({ size = 512, rx = 115, pillScale = 1 }) {
  const pw = 340 * pillScale, ph = 120 * pillScale, sw = 14 * pillScale, fs = 104 * pillScale;
  const px = (512 - pw) / 2, py = (512 - ph) / 2;
  const ty = 256 + fs * 0.36;
  return `<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY1}"/><stop offset="1" stop-color="${NAVY2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.12" r="0.75">
      <stop offset="0" stop-color="${ORANGE}" stop-opacity="0.38"/><stop offset="1" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="${rx}" fill="url(#bg)"/>
  <rect width="512" height="512" rx="${rx}" fill="url(#glow)"/>
  <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="${ph / 2}" fill="rgba(255,255,255,0.06)" stroke="${ORANGE}" stroke-width="${sw}"/>
  <text x="256" y="${ty}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="900" fill="${ORANGE}" letter-spacing="3">abco</text>
</svg>`;
}

const favSvg = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${NAVY1}"/><stop offset="1" stop-color="${NAVY2}"/>
  </linearGradient></defs>
  <rect width="64" height="64" rx="14" fill="url(#bg)"/>
  <text x="32" y="47" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="900" fill="${ORANGE}">a</text>
</svg>`;

// 512 asosiy (yumaloq burchak)
await sharp(Buffer.from(mainSvg({}))).png().toFile("public/icon-512.png");
// 192 — 512 dan kichraytirilgan
await sharp(Buffer.from(mainSvg({}))).resize(192, 192).png().toFile("public/icon-192.png");
// maskable — to'liq kvadrat fon (rx=0), pill xavfsiz zonada (~78%)
await sharp(Buffer.from(mainSvg({ rx: 0, pillScale: 0.78 }))).png().toFile("public/icon-maskable-512.png");
// apple-touch — to'liq kvadrat (iOS o'zi yumaloqlaydi), 180x180
await sharp(Buffer.from(mainSvg({ rx: 0 }))).resize(180, 180).png().toFile("public/apple-touch-icon.png");
// favicon 32
await sharp(Buffer.from(favSvg)).resize(32, 32).png().toFile("public/favicon-32.png");

console.log("ikonkalar yozildi");
