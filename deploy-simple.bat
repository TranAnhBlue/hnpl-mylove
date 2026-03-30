@echo off
chcp 65001 >nul
echo ╔════════════════════════════════════════════════════════════╗
echo ║  🚀 DEPLOY ĐƠN GIẢN LÊN ONLYLOVEHNPL.VERCEL.APP          ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if Vercel CLI is installed
echo [1/4] 🔍 Kiểm tra Vercel CLI...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Chưa cài Vercel CLI
    echo 📦 Đang cài đặt...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Không thể cài Vercel CLI
        echo 👉 Vui lòng chạy: npm install -g vercel
        pause
        exit /b 1
    )
)
echo ✅ Vercel CLI đã sẵn sàng
echo.

REM Build
echo [2/4] 🏗️ Build frontend...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build thất bại
    cd ..
    pause
    exit /b 1
)
echo ✅ Build thành công
echo.

REM Login
echo [3/4] 🔐 Login Vercel...
echo 👉 Nếu chưa login, trình duyệt sẽ mở
echo.
call vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    call vercel login
    if %errorlevel% neq 0 (
        echo ❌ Login thất bại
        cd ..
        pause
        exit /b 1
    )
)
echo ✅ Đã login
echo.

REM Deploy
echo [4/4] 🚀 Deploy...
echo.
call vercel --prod --yes
if %errorlevel% neq 0 (
    echo ❌ Deploy thất bại
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    ✨ THÀNH CÔNG! ✨                       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🎉 Ứng dụng đã online!
echo.
echo 🌐 URL: https://onlylovehnpl.vercel.app
echo 🎬 Slideshow: https://onlylovehnpl.vercel.app/love-slideshow
echo.
echo 💝 Chia sẻ với người thân yêu nhé!
echo.
pause
