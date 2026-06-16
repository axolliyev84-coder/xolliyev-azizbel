# =====================================================
#  DAFTAR — МСФО SAYT AUTO-SETUP SKRIPTI
#  Ishga tushirish: PowerShell (Admin emas bo'lsa ham ishlaydi)
#  Faqat BIR MARTA ishlatiladi
# =====================================================

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Daftar МСФО — Avtomatik o'rnatish" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# --- 1. Node.js tekshirish ---
Write-Host "[1/6] Node.js tekshirilmoqda..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "  ✅ Node.js topildi: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js topilmadi! https://nodejs.org dan yuklab o'rnating." -ForegroundColor Red
    pause; exit
}

# --- 2. Antropik API key so'rash ---
Write-Host ""
Write-Host "[2/6] Anthropic API key..." -ForegroundColor Yellow
Write-Host "  console.anthropic.com -> API Keys -> Create key" -ForegroundColor Gray
$apiKey = Read-Host "  API keyingizni kiriting (sk-ant-...)"
if (-not $apiKey.StartsWith("sk-ant-")) {
    Write-Host "  ⚠️  Key noto'g'ri ko'rinadi, lekin davom etamiz..." -ForegroundColor DarkYellow
}

# --- 3. .env fayl yaratish ---
Write-Host ""
Write-Host "[3/6] .env fayl yaratilmoqda..." -ForegroundColor Yellow
"VITE_ANTHROPIC_KEY=$apiKey" | Out-File -FilePath ".env" -Encoding UTF8
Write-Host "  ✅ .env yaratildi" -ForegroundColor Green

# --- 4. npm install ---
Write-Host ""
Write-Host "[4/6] Kutubxonalar o'rnatilmoqda (npm install)..." -ForegroundColor Yellow
Write-Host "  Bu 1-2 daqiqa oladi..." -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ❌ npm install xato. Internetni tekshiring." -ForegroundColor Red
    pause; exit
}
Write-Host "  ✅ O'rnatildi" -ForegroundColor Green

# --- 5. Lokal test ---
Write-Host ""
Write-Host "[5/6] Lokal test..." -ForegroundColor Yellow
Write-Host "  Sayt http://localhost:5173 da ochiladi" -ForegroundColor Gray
Write-Host "  Sayt to'g'ri ishlayaptimi tekshiring, keyin bu oynaga qayting" -ForegroundColor Gray
Write-Host ""
$testNow = Read-Host "  Lokal testni hozir qilasizmi? (h/y)"
if ($testNow -eq "h" -or $testNow -eq "H") {
    Write-Host "  Brauzer ochilmoqda... Yopish uchun Ctrl+C bosing, so'ng bu skriptga qayting." -ForegroundColor Gray
    Start-Process "http://localhost:5173"
    npm run dev
}

# --- 6. Vercel deploy ---
Write-Host ""
Write-Host "[6/6] Vercelga yuklash..." -ForegroundColor Yellow

# Vercel CLI bormi?
try {
    vercel --version 2>&1 | Out-Null
    Write-Host "  ✅ Vercel CLI topildi" -ForegroundColor Green
} catch {
    Write-Host "  Vercel CLI o'rnatilmoqda..." -ForegroundColor Gray
    npm install -g vercel
}

Write-Host ""
Write-Host "  Vercel sizdan login so'raydi (GitHub orqali kiring)" -ForegroundColor Gray
Write-Host "  Savollar uchun: hammasi ENTER bosing (standart javoblar to'g'ri)" -ForegroundColor Gray
Write-Host ""
vercel --yes

# --- Tugadi ---
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  ✅ SAYT MUVAFFAQIYATLI YUKLANDI!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Endi Vercel dashboard'da API keyni qo'shing:" -ForegroundColor Yellow
Write-Host "  1. vercel.com/dashboard -> sizning proyekt" -ForegroundColor White
Write-Host "  2. Settings -> Environment Variables" -ForegroundColor White
Write-Host "  3. Name: VITE_ANTHROPIC_KEY" -ForegroundColor White
Write-Host "  4. Value: $apiKey" -ForegroundColor White
Write-Host "  5. Save -> Deployments -> Redeploy" -ForegroundColor White
Write-Host ""
Write-Host "  Keyingi safar yangilik qo'shsangiz:" -ForegroundColor Yellow
Write-Host "  vercel --prod" -ForegroundColor White
Write-Host ""
pause
