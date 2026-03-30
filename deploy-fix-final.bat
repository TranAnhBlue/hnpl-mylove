@echo off
chcp 65001 >nul
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║         🚀 DEPLOY FIX CUỐI CÙNG                          ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo     Đang fix lỗi 404 slideshow...
echo.

REM Commit all changes
echo     [1/3] 📦 Commit changes...
git add .
git commit -m "Fix slideshow routing - final"
git push
echo     ✅ Đã push lên GitHub
echo.

REM Build
echo     [2/3] 🏗️ Build...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo     ❌ Build thất bại
    cd ..
    pause
    exit /b 1
)
echo     ✅ Build thành công
echo.

REM Deploy
echo     [3/3] 🚀 Deploy...
call vercel --prod --yes
if %errorlevel% neq 0 (
    echo     ❌ Deploy thất bại
    cd ..
    pause
    exit /b 1
)
cd ..
echo     ✅ Deploy thành công
echo.

echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║                    ✨ HOÀN THÀNH! ✨                       ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo     🎉 Đã deploy xong!
echo.
echo     🧪 Test ngay:
echo.
echo     1. Mở: https://onlylovehnpl.vercel.app/love-slideshow
echo        Nếu vẫn 404, thử:
echo.
echo     2. Mở: https://onlylovehnpl.vercel.app/#/love-slideshow
echo        (Hash routing - backup)
echo.
echo     3. Hoặc test QR:
echo        - Mở: https://onlylovehnpl.vercel.app
echo        - Click 🎬
echo        - Quét QR
echo.
echo     ⏳ Lưu ý: Vercel cần 1-2 phút để propagate changes
echo        Nếu vẫn 404, đợi 2 phút rồi refresh (Ctrl+F5)
echo.
pause
