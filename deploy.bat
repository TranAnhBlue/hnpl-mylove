@echo off
echo 🚀 Bắt đầu deploy...

REM Build frontend
echo 📦 Building frontend...
cd client
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Frontend build thất bại!
    exit /b 1
)

echo ✅ Frontend build thành công!
cd ..

REM Deploy với Vercel
echo 🌐 Deploying to Vercel...
call vercel --prod

echo ✨ Deploy hoàn tất!
echo 🎉 Kiểm tra URL của bạn trên Vercel dashboard
pause
