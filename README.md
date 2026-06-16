# Daftar — МСФО Akademiya

Interaktiv МСФО kursi: teoriya, kartochkalar, testlar va AI-repetitor (Vite + React).

- **GitHub:** https://github.com/axolliyev84-coder/xolliyev-azizbel
- **Hosting:** Vercel (loyiha: `mcfo-sayt`)

## Arxitektura

- `src/App.jsx` — butun frontend (sahifa, kartochkalar, testlar, repetitor).
- `api/chat.js` — Vercel serverless funksiyasi. Anthropic API kalitini **serverda** ushlaydi
  (`ANTHROPIC_KEY` env o'zgaruvchisi). Kalit hech qachon brauzerga chiqmaydi.
  Frontend `api.anthropic.com` o'rniga `/api/chat` ga murojaat qiladi.

## Maxfiy kalit (muhim)

Kalit kodga yozilmaydi. U faqat ikki joyda turadi:

1. **Production** — Vercel → Project → Settings → Environment Variables → `ANTHROPIC_KEY`.
2. **Lokal sinov** — `.env` faylida `ANTHROPIC_KEY=...` (bu fayl `.gitignore`da, GitHub'ga ketmaydi).

## Saytni yangilash (deploy)

Kod o'zgargach:

```
git add -A
git commit -m "ozgarish izohi"
git push
npx vercel --prod
```

## Lokal ishlash

AI-repetitorsiz oddiy ko'rinish uchun:

```
npm run dev      # http://localhost:5173
```

AI-repetitor lokal ishlashi uchun (kalit kerak, `.env`da `ANTHROPIC_KEY`):

```
npx vercel dev
```
