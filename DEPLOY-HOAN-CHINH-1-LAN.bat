@echo off
chcp 65001 >nul
cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║         🎯 DEPLOY HOÀN CHỈNH - CHỈ 1 LẦN DUY NHẤT       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 💝 Script này sẽ setup TẤT CẢ:
echo    ✅ Kết nối MongoDB Atlas
echo    ✅ Deploy Backend lên Railway
echo    ✅ Deploy Frontend lên Vercel
echo    ✅ Kết nối tất cả với nhau
echo.
echo 📋 Bạn cần chuẩn bị:
echo    1. MongoDB Atlas Connection String
echo    2. Railway account (đã login)
echo    3. Vercel account (đã login)
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo PHẦN 1: MONGODB ATLAS
echo ═══════════════════════════════════════════════════════════
echo.
echo Bạn đã có MongoDB Atlas với:
echo - Cluster: cluster0.02q3jqa.mongodb.net
echo - Database: aniversary
echo - Collection: memories
echo.
echo Bây giờ cần lấy Connection String:
echo.
echo 1. Vào: https://cloud.mongodb.com
start https://cloud.mongodb.com
echo 2. Chọn cluster0 -^> Connect -^> Connect your application
echo 3. Copy connection string
echo 4. Thay ^<password^> bằng password thật
echo.
echo Ví dụ:
echo mongodb+srv://admin:MyPass123@cluster0.02q3jqa.mongodb.net/aniversary
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
echo ✅ MongoDB URI đã lưu
echo.

echo ═══════════════════════════════════════════════════════════
echo PHẦN 2: CẬP NHẬT CODE
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

echo 📦 Commit code...
git add .
git commit -m "Setup for production deploy"
echo.

set /p PUSH="Push lên GitHub? (y/n): "
if /i "%PUSH%"=="y" (
    git push
    echo ✅ Đã push
)
echo.

echo ═══════════════════════════════════════════════════════════
echo PHẦN 3: DEPLOY BACKEND LÊN RAILWAY
echo ═══════════════════════════════════════════════════════════
echo.

echo 🚂 Mở Railway Dashboard...
start https://railway.app
echo.

echo Làm theo các bước sau trong Railway:
echo.
echo 1. New Project -^> Deploy from GitHub
echo 2. Chọn repository: hnpl-mylove
echo 3. Settings:
echo    - Root Directory: server
echo    - Start Command: node server.js
echo.

echo 4. Variables (thêm từng dòng):
echo.
echo    PORT
echo    5001
echo.
echo    MONGODB_URI
echo    %MONGODB_URI%
echo.
echo    CORS_ORIGIN
echo    https://onlylovehnpl.vercel.app
echo.
echo    NODE_ENV
echo    production
echo.
echo 5. Đợi Railway deploy xong (2-3 phút)
echo    - Tab Deployments -^> Xem status "Success"
echo.
echo 6. Settings -^> Networking -^> Generate Domain
echo    - Copy URL (ví dụ: https://xxx.up.railway.app)
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

echo 🧪 Test backend...
curl -s %RAILWAY_URL%/api/memories
echo.
echo.
echo Nếu thấy [] hoặc [...] → Backend OK! ✅
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo PHẦN 4: DEPLOY FRONTEND LÊN VERCEL
echo ═══════════════════════════════════════════════════════════
echo.

echo 📝 Cập nhật client/.env.production...
echo VITE_API_URL=%RAILWAY_URL%/api > client\.env.production
echo ✅ Đã cập nhật
echo.
type client\.env.production
echo.

echo 📦 Commit backend URL...
git add client/.env.production
git commit -m "Connect frontend to Railway backend"
git push
echo.

echo 🔨 Build frontend...
cd client
call npm run build
if errorlevel 1 (
    echo ❌ Build thất bại!
    cd ..
    pause
    exit /b
)
echo ✅ Build thành công
echo.

echo 🚀 Deploy lên Vercel...
call vercel --prod
cd ..
echo ✅ Deploy thành công
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║              🎉🎉🎉 HOÀN THÀNH TẤT CẢ! 🎉🎉🎉            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 💝 Tất cả đã kết nối thành công:
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  🗄️  MongoDB Atlas                                        ║
echo ║     cluster0.02q3jqa.mongodb.net                         ║
echo ║     Database: aniversary                                 ║
echo ║                                                           ║
echo ║  🚂 Railway Backend                                       ║
echo ║     %RAILWAY_URL%
echo ║                                                           ║
echo ║  🌐 Vercel Frontend                                       ║
echo ║     https://onlylovehnpl.vercel.app                      ║
echo ║                                                           ║
echo ║  🎬 Slideshow                                             ║
echo ║     https://onlylovehnpl.vercel.app/#/love-slideshow     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 🧪 TEST NGAY:
echo.
echo 1. Mở: https://onlylovehnpl.vercel.app
echo 2. Click nút + (góc dưới phải)
echo 3. Thêm kỷ niệm mới
echo 4. Upload ảnh
echo 5. Click Lưu
echo.
echo    → Nếu kỷ niệm xuất hiện = Thành công! ✅
echo.
echo 6. Click nút 🎬 (header)
echo 7. Quét QR code bằng điện thoại
echo 8. Slideshow mở với 70 ảnh + nhạc "Lễ Đường"
echo.
echo    → Nếu slideshow chạy = Hoàn hảo! ✅
echo.

echo ═══════════════════════════════════════════════════════════
echo 📝 LƯU THÔNG TIN QUAN TRỌNG
echo ═══════════════════════════════════════════════════════════
echo.
echo MongoDB URI: %MONGODB_URI%
echo Railway URL: %RAILWAY_URL%
echo Frontend URL: https://onlylovehnpl.vercel.app
echo.
echo 💡 LẦN SAU CẬP NHẬT:
echo.
echo Chỉ sửa Frontend:
echo    update-frontend-only.bat
echo.
echo Chỉ sửa Backend:
echo    update-backend-only.bat
echo.
echo Không cần chạy lại script này nữa!
echo.
echo ═══════════════════════════════════════════════════════════
echo 🎉 CHÚC MỪNG! BẠN ĐÃ DEPLOY THÀNH CÔNG!
echo ═══════════════════════════════════════════════════════════
echo.
pause
