@echo off
chcp 65001 >nul
echo ╔════════════════════════════════════════════════════════════╗
echo ║  🚀 DEPLOY TOÀN BỘ ỨNG DỤNG LÊN ONLYLOVEHNPL.VERCEL.APP  ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check Node.js
echo [1/8] 🔍 Kiểm tra Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Lỗi: Chưa cài Node.js
    echo 👉 Tải tại: https://nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js đã cài
echo.

REM Check npm
echo [2/8] 🔍 Kiểm tra npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Lỗi: npm không hoạt động
    pause
    exit /b 1
)
echo ✅ npm đã sẵn sàng
echo.

REM Install Vercel CLI
echo [3/8] 📦 Cài đặt Vercel CLI...
call npm install -g vercel
if %errorlevel% neq 0 (
    echo ⚠️ Không thể cài Vercel CLI tự động
    echo 👉 Vui lòng chạy: npm install -g vercel
    pause
    exit /b 1
)
echo ✅ Vercel CLI đã cài
echo.

REM Check Git
echo [4/8] 🔍 Kiểm tra Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Chưa cài Git
    echo 👉 Tải tại: https://git-scm.com
    echo.
    echo 💡 Bạn có thể tiếp tục deploy mà không cần Git
    echo    nhưng nên cài Git để dễ quản lý code
    echo.
    pause
) else (
    echo ✅ Git đã cài
)
echo.

REM Install dependencies
echo [5/8] 📦 Cài đặt dependencies...
echo.
echo    📦 Root dependencies...
call npm install
echo.
echo    📦 Client dependencies...
call npm install --prefix client
echo.
echo    📦 Server dependencies...
call npm install --prefix server
echo.
if %errorlevel% neq 0 (
    echo ❌ Lỗi khi cài dependencies
    pause
    exit /b 1
)
echo ✅ Tất cả dependencies đã cài
echo.

REM Build frontend
echo [6/8] 🏗️ Build frontend...
call npm run build --prefix client
if %errorlevel% neq 0 (
    echo ❌ Build frontend thất bại
    pause
    exit /b 1
)
echo ✅ Build frontend thành công
echo.

REM Login Vercel
echo [7/8] 🔐 Login Vercel...
echo.
echo 👉 Trình duyệt sẽ mở để bạn login Vercel
echo 👉 Sau khi login, quay lại terminal này
echo.
pause
call vercel login
if %errorlevel% neq 0 (
    echo ❌ Login Vercel thất bại
    pause
    exit /b 1
)
echo ✅ Đã login Vercel
echo.

REM Deploy Frontend
echo [8/8] 🚀 Deploy Frontend lên Vercel...
echo.
echo 📍 Domain: onlylovehnpl.vercel.app
echo.
cd client
call vercel --prod --name onlylovehnpl --yes
if %errorlevel% neq 0 (
    echo ❌ Deploy frontend thất bại
    cd ..
    pause
    exit /b 1
)
cd ..
echo ✅ Deploy frontend thành công!
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║                    ✨ HOÀN THÀNH! ✨                       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🎉 Frontend đã deploy thành công!
echo.
echo 🌐 URLs:
echo    👉 Frontend: https://onlylovehnpl.vercel.app
echo    👉 Slideshow: https://onlylovehnpl.vercel.app/love-slideshow
echo.
echo ⚠️ LƯU Ý: Backend chưa deploy!
echo.
echo 📋 Để deploy backend:
echo    1. Tạo tài khoản Railway: https://railway.app
echo    2. Tạo tài khoản MongoDB Atlas: https://mongodb.com/cloud/atlas
echo    3. Xem hướng dẫn: DEPLOY-ONLYLOVEHNPL.md
echo.
echo 💡 Hoặc chạy script: deploy-backend.bat
echo.
echo 🎬 Test ngay:
echo    1. Mở: https://onlylovehnpl.vercel.app
echo    2. Click nút 🎬
echo    3. Quét QR code
echo    4. Xem slideshow 70 ảnh với nhạc!
echo.
echo 💝 Chia sẻ link với người thân yêu nhé!
echo.
pause
