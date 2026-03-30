@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║              📱 CẬP NHẬT FRONTEND ONLY                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Dùng script này khi:
echo - Chỉ sửa code frontend (UI, CSS, components)
echo - Backend không thay đổi
echo - Backend URL đã cố định
echo.

echo 🔨 Build frontend...
cd client
call npm run build
if errorlevel 1 (
    echo ❌ Build thất bại!
    pause
    exit /b 1
)
echo ✅ Build thành công
echo.

echo 🚀 Deploy lên Vercel...
call vercel --prod
cd ..
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║                    ✅ XONG!                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Frontend: https://onlylovehnpl.vercel.app
echo Slideshow: https://onlylovehnpl.vercel.app/#/love-slideshow
echo.
pause
