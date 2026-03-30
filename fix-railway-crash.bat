@echo off
chcp 65001 >nul
cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║         🔧 FIX RAILWAY CRASH - DEPLOY LẠI                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 🔍 Vấn đề phát hiện:
echo    - Thiếu thư mục uploads/
echo    - Thiếu environment variables check
echo    - Thiếu health check endpoint
echo.

echo ✅ Đã fix:
echo    - Tự động tạo thư mục uploads/
echo    - Kiểm tra MONGODB_URI trước khi start
echo    - Thêm health check: / và /api/health
echo    - CORS config đúng
echo    - Listen trên 0.0.0.0
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 1: COMMIT VÀ PUSH CODE MỚI
echo ═══════════════════════════════════════════════════════════
echo.

echo 📦 Commit fixes...
git add server/
git status
echo.

git commit -m "Fix Railway crash: auto-create uploads dir, add health checks, improve error handling"
echo.

set /p PUSH="Push lên GitHub để Railway auto-deploy? (y/n): "
if /i not "%PUSH%"=="y" (
    echo Hủy bỏ. Chạy lại khi sẵn sàng.
    pause
    exit /b
)

echo.
echo 🚀 Pushing to GitHub...
git push
echo ✅ Đã push
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 2: KIỂM TRA RAILWAY ENVIRONMENT VARIABLES
echo ═══════════════════════════════════════════════════════════
echo.

echo 🚂 Mở Railway Dashboard...
start https://railway.app
echo.

echo Kiểm tra Variables trong Railway:
echo.
echo ✅ Phải có các biến sau:
echo.
echo    PORT = 5001
echo    MONGODB_URI = mongodb+srv://...
echo    CORS_ORIGIN = https://onlylovehnpl.vercel.app
echo    NODE_ENV = production
echo.
echo ❌ Nếu thiếu, thêm vào!
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 3: ĐỢI RAILWAY DEPLOY
echo ═══════════════════════════════════════════════════════════
echo.

echo Railway đang tự động deploy từ GitHub...
echo.
echo 1. Vào Railway Dashboard
echo 2. Tab "Deployments"
echo 3. Xem deployment mới nhất
echo 4. Đợi status "Success" (2-3 phút)
echo.
echo Nếu vẫn "Crashed":
echo    - Click vào deployment
echo    - Xem "Deploy Logs"
echo    - Tìm dòng lỗi màu đỏ
echo.
pause

echo.
set /p DEPLOYED="Railway đã deploy thành công chưa? (y/n): "

if /i not "%DEPLOYED%"=="y" (
    echo.
    echo ❌ Nếu vẫn lỗi, cần xem logs:
    echo    1. Railway -^> Deployments -^> Click deployment
    echo    2. Tab "Deploy Logs"
    echo    3. Copy lỗi và báo lại
    echo.
    pause
    exit /b
)

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 4: LẤY RAILWAY URL VÀ TEST
echo ═══════════════════════════════════════════════════════════
echo.

echo 1. Railway -^> Settings -^> Networking
echo 2. Copy URL (hoặc Generate Domain nếu chưa có)
echo.

set /p RAILWAY_URL="Nhập Railway URL: "

if "%RAILWAY_URL%"=="" (
    echo ❌ URL không được để trống!
    pause
    exit /b
)

echo.
echo ✅ Railway URL: %RAILWAY_URL%
echo.

echo 🧪 Test health check...
curl -s %RAILWAY_URL%/
echo.
echo.

echo 🧪 Test API...
curl -s %RAILWAY_URL%/api/memories
echo.
echo.

echo Nếu thấy JSON response → Backend OK! ✅
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 5: CẬP NHẬT FRONTEND
echo ═══════════════════════════════════════════════════════════
echo.

echo 📝 Cập nhật client/.env.production...
echo VITE_API_URL=%RAILWAY_URL%/api > client\.env.production
echo ✅ Đã cập nhật
echo.
type client\.env.production
echo.

echo 📦 Commit...
git add client/.env.production
git commit -m "Update backend URL to %RAILWAY_URL%"
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
echo ║                    🎉 HOÀN THÀNH! 🎉                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 💝 Tất cả đã hoạt động:
echo.
echo 🚂 Backend: %RAILWAY_URL%
echo 🌐 Frontend: https://onlylovehnpl.vercel.app
echo 🎬 Slideshow: https://onlylovehnpl.vercel.app/#/love-slideshow
echo.
echo 🧪 Test ngay:
echo    1. Vào: https://onlylovehnpl.vercel.app
echo    2. Thêm kỷ niệm mới
echo    3. Quét QR slideshow
echo.
pause
