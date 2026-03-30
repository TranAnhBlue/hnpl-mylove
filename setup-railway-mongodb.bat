@echo off
chcp 65001 >nul
cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║         🚂 SETUP RAILWAY VỚI MONGODB ATLAS               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 📋 Bạn đã có:
echo    ✅ MongoDB Atlas: cluster0.02q3jqa.mongodb.net
echo    ✅ Database: aniversary
echo    ✅ Collection: memories (có data)
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 1: LẤY MONGODB CONNECTION STRING
echo ═══════════════════════════════════════════════════════════
echo.
echo 1. Vào MongoDB Atlas: https://cloud.mongodb.com
start https://cloud.mongodb.com
echo.
echo 2. Chọn cluster: cluster0
echo.
echo 3. Click "Connect" -^> "Connect your application"
echo.
echo 4. Copy connection string (dạng):
echo    mongodb+srv://username:password@cluster0.02q3jqa.mongodb.net/aniversary
echo.
echo 5. Thay ^<password^> bằng password thật của bạn
echo.
pause

echo.
set /p MONGODB_URI="Nhập MongoDB Connection String: "

if "%MONGODB_URI%"=="" (
    echo ❌ Connection string không được để trống!
    pause
    exit /b
)

echo.
echo ✅ MongoDB URI: %MONGODB_URI%
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 2: CẬP NHẬT SERVER/.ENV (LOCAL TEST)
echo ═══════════════════════════════════════════════════════════
echo.

echo 📝 Cập nhật server/.env...
(
echo PORT=5001
echo MONGODB_URI=%MONGODB_URI%
echo CORS_ORIGIN=http://localhost:5173
) > server\.env

echo ✅ Đã cập nhật server/.env
echo.

echo 🧪 Test local backend...
echo.
set /p TEST_LOCAL="Bạn có muốn test local trước không? (y/n): "

if /i "%TEST_LOCAL%"=="y" (
    echo.
    echo 🚀 Khởi động backend local...
    echo Mở terminal mới và chạy:
    echo    cd server
    echo    npm start
    echo.
    echo Sau đó test: http://localhost:5001/api/memories
    echo.
    pause
)

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 3: SETUP RAILWAY
echo ═══════════════════════════════════════════════════════════
echo.

echo 🚂 Mở Railway Dashboard...
start https://railway.app
echo.

echo Làm theo các bước sau:
echo.
echo 1. New Project -^> Deploy from GitHub
echo 2. Chọn repository: hnpl-mylove
echo 3. Settings -^> Root Directory: server
echo 4. Settings -^> Environment Variables, thêm:
echo.

echo    PORT=5001
echo    MONGODB_URI=%MONGODB_URI%
echo    CORS_ORIGIN=https://onlylovehnpl.vercel.app
echo    NODE_ENV=production
echo.
echo 5. Settings -^> Networking -^> Generate Domain
echo 6. Copy Railway URL (ví dụ: https://xxx.up.railway.app)
echo.
pause

echo.
set /p RAILWAY_URL="Nhập Railway URL (sau khi deploy xong): "

if "%RAILWAY_URL%"=="" (
    echo ❌ Railway URL không được để trống!
    pause
    exit /b
)

echo.
echo ✅ Railway URL: %RAILWAY_URL%
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 4: KẾT NỐI FRONTEND VỚI BACKEND
echo ═══════════════════════════════════════════════════════════
echo.

echo 📝 Cập nhật client/.env.production...
echo VITE_API_URL=%RAILWAY_URL%/api > client\.env.production
echo ✅ Đã cập nhật
echo.

echo 📦 Commit changes...
git add client/.env.production server/.env
git commit -m "Connect to Railway and MongoDB Atlas"
git push
echo.

echo 🚀 Deploy frontend...
cd client
call npm run build
call vercel --prod
cd ..
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║                    🎉 HOÀN THÀNH! 🎉                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 💝 Tất cả đã kết nối:
echo.
echo 🗄️  MongoDB Atlas: cluster0.02q3jqa.mongodb.net
echo 🚂 Railway Backend: %RAILWAY_URL%
echo 🌐 Vercel Frontend: https://onlylovehnpl.vercel.app
echo 🎬 Slideshow: https://onlylovehnpl.vercel.app/#/love-slideshow
echo.
echo 🧪 Test ngay:
echo    1. Vào: https://onlylovehnpl.vercel.app
echo    2. Thêm kỷ niệm mới
echo    3. Xem kỷ niệm cũ (đã có trong MongoDB)
echo    4. Quét QR slideshow
echo.
echo 📝 Lưu thông tin:
echo    MongoDB URI: %MONGODB_URI%
echo    Railway URL: %RAILWAY_URL%
echo.
pause
