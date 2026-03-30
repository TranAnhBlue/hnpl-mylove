@echo off
echo 🚀 Deploy lên onlylovehnpl.vercel.app
echo.

REM Check if in correct directory
if not exist "client" (
    echo ❌ Lỗi: Không tìm thấy thư mục client
    echo Vui lòng chạy script từ thư mục gốc dự án
    pause
    exit /b 1
)

REM Build frontend
echo 📦 Building frontend...
cd client
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build thất bại!
    pause
    exit /b 1
)

echo ✅ Build thành công!
echo.

REM Deploy to Vercel
echo 🌐 Deploying to Vercel...
echo Project: onlylovehnpl
echo.

call vercel --prod --yes

if %errorlevel% neq 0 (
    echo ❌ Deploy thất bại!
    pause
    exit /b 1
)

cd ..

echo.
echo ✨ Deploy hoàn tất!
echo.
echo 🎉 Ứng dụng của bạn đã online tại:
echo 👉 https://onlylovehnpl.vercel.app
echo.
echo 🎬 Slideshow:
echo 👉 https://onlylovehnpl.vercel.app/love-slideshow
echo.
echo 💝 Hãy chia sẻ với người thân yêu!
echo.
pause
