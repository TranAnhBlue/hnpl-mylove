@echo off
chcp 65001 >nul
cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║         🎯 DEPLOY ỔN ĐỊNH - KHÔNG BỊ XUNG ĐỘT            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 📋 Chiến lược: Deploy Backend TRƯỚC, Frontend SAU
echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 1: KIỂM TRA RAILWAY BACKEND
echo ═══════════════════════════════════════════════════════════
echo.

set /p HAS_RAILWAY="Bạn đã có Railway Backend URL chưa? (y/n): "

if /i "%HAS_RAILWAY%"=="n" (
    echo.
    echo 🚂 Cần setup Railway trước:
    echo.
    echo 1. Vào: https://railway.app
    echo 2. New Project -^> Deploy from GitHub
    echo 3. Chọn repo: hnpl-mylove
    echo 4. Settings -^> Root Directory: server
    echo 5. Add Environment Variables:
    echo    PORT=5001
    echo    MONGODB_URI=mongodb+srv://...
    echo    CORS_ORIGIN=https://onlylovehnpl.vercel.app
    echo 6. Settings -^> Networking -^> Generate Domain
    echo 7. Copy URL và chạy lại script này
    echo.
    start https://railway.app
    pause
    exit /b
)

echo.
set /p BACKEND_URL="Nhập Railway Backend URL: "

if "%BACKEND_URL%"=="" (
    echo ❌ URL không được để trống!
    pause
    exit /b
)

echo.
echo ✅ Backend URL: %BACKEND_URL%
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 2: CẬP NHẬT FRONTEND CONFIG
echo ═══════════════════════════════════════════════════════════
echo.

echo 📝 Cập nhật client/.env.production...
echo VITE_API_URL=%BACKEND_URL%/api > client\.env.production
echo ✅ Đã cập nhật
echo.
type client\.env.production
echo.

echo 📦 Commit changes...
git add client/.env.production
git commit -m "Update backend URL to %BACKEND_URL%"
echo.

set /p PUSH="Push lên GitHub? (y/n): "
if /i "%PUSH%"=="y" (
    git push
    echo ✅ Đã push
)
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 3: BUILD VÀ DEPLOY FRONTEND
echo ═══════════════════════════════════════════════════════════
echo.

echo 🔨 Build frontend...
cd client
call npm run build
echo ✅ Build xong
echo.

echo 🚀 Deploy lên Vercel...
call vercel --prod
cd ..
echo ✅ Deploy xong
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║                    🎉 HOÀN THÀNH! 🎉                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 💝 Cả Frontend và Backend đã kết nối ổn định!
echo.
echo 🌐 URLs:
echo    Frontend: https://onlylovehnpl.vercel.app
echo    Backend: %BACKEND_URL%
echo    Slideshow: https://onlylovehnpl.vercel.app/#/love-slideshow
echo.
echo 🧪 Test ngay:
echo    1. Vào: https://onlylovehnpl.vercel.app
echo    2. Thêm kỷ niệm mới (test backend)
echo    3. Quét QR slideshow
echo.
echo 📝 Lưu ý:
echo    - Backend URL đã CỐ ĐỊNH, không đổi nữa
echo    - Lần sau chỉ cần: cd client ^&^& vercel --prod
echo    - Không cần chạy lại script này
echo.
pause
