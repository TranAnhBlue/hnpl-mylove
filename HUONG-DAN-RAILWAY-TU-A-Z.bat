@echo off
chcp 65001 >nul
cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║         🚂 HƯỚNG DẪN SETUP RAILWAY TỪ A-Z                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 💝 Local server đã chạy thành công!
echo 🎯 Bây giờ deploy lên Railway để online
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 1: MỞ RAILWAY DASHBOARD
echo ═══════════════════════════════════════════════════════════
echo.

echo 🌐 Đang mở Railway...
start https://railway.app
echo.

echo 1. Đăng nhập Railway (nếu chưa)
echo 2. Bạn sẽ thấy project "hnpl-mylove" (nếu đã tạo)
echo.

set /p HAS_PROJECT="Bạn đã có project 'hnpl-mylove' trên Railway chưa? (y/n): "

if /i "%HAS_PROJECT%"=="n" (
    echo.
    echo ═══════════════════════════════════════════════════════════
    echo TẠO PROJECT MỚI
    echo ═══════════════════════════════════════════════════════════
    echo.
    echo 1. Click "New Project"
    echo 2. Chọn "Deploy from GitHub repo"
    echo 3. Nếu chưa connect GitHub:
    echo    - Click "Configure GitHub App"
    echo    - Authorize Railway
    echo    - Chọn repository: hnpl-mylove
    echo 4. Nếu đã connect:
    echo    - Chọn repository: hnpl-mylove
    echo 5. Railway sẽ tự động deploy
    echo.
    pause
)

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 2: CẤU HÌNH PROJECT
echo ═══════════════════════════════════════════════════════════
echo.

echo 1. Click vào project "hnpl-mylove"
echo 2. Click vào service (tên repo hoặc "hnpl-mylove")
echo 3. Tab "Settings"
echo.
pause

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 3: CẤU HÌNH ROOT DIRECTORY
echo ═══════════════════════════════════════════════════════════
echo.

echo Trong Settings, tìm "Root Directory":
echo.
echo 1. Click "Root Directory"
echo 2. Nhập: server
echo 3. Click "Update"
echo.
echo ⚠️  QUAN TRỌNG: Phải là "server" (không có dấu /)
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 4: CẤU HÌNH START COMMAND
echo ═══════════════════════════════════════════════════════════
echo.

echo Trong Settings, tìm "Start Command":
echo.
echo 1. Click "Start Command"
echo 2. Nhập: node server.js
echo 3. Click "Update"
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 5: THÊM ENVIRONMENT VARIABLES
echo ═══════════════════════════════════════════════════════════
echo.

echo Tab "Variables" (bên cạnh Settings)
echo.
echo Thêm 4 biến sau (click "New Variable" cho mỗi biến):
echo.

echo ┌─────────────────────────────────────────────────────────┐
echo │ Variable 1:                                             │
echo │ Name:  PORT                                             │
echo │ Value: 5001                                             │
echo └─────────────────────────────────────────────────────────┘
echo.
pause

echo ┌─────────────────────────────────────────────────────────┐
echo │ Variable 2:                                             │
echo │ Name:  MONGODB_URI                                      │
echo │ Value: mongodb+srv://trananhblue:blue22062004%%40@cluster0.02q3jqa.mongodb.net/aniversary
echo │                                                         │
echo │ ⚠️  LƯU Ý: Dùng %%40 thay vì @ trong password!          │
echo └─────────────────────────────────────────────────────────┘
echo.
pause

echo ┌─────────────────────────────────────────────────────────┐
echo │ Variable 3:                                             │
echo │ Name:  CORS_ORIGIN                                      │
echo │ Value: https://onlylovehnpl.vercel.app                  │
echo └─────────────────────────────────────────────────────────┘
echo.
pause

echo ┌─────────────────────────────────────────────────────────┐
echo │ Variable 4:                                             │
echo │ Name:  NODE_ENV                                         │
echo │ Value: production                                       │
echo └─────────────────────────────────────────────────────────┘
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 6: ĐỢI RAILWAY DEPLOY
echo ═══════════════════════════════════════════════════════════
echo.

echo Railway sẽ tự động deploy sau khi thêm variables
echo.
echo 1. Tab "Deployments"
echo 2. Xem deployment mới nhất
echo 3. Đợi status "Success" (2-3 phút)
echo.
echo Nếu "Failed":
echo    - Click vào deployment
echo    - Tab "Deploy Logs"
echo    - Xem lỗi
echo.
pause

echo.
set /p DEPLOYED="Railway đã deploy thành công chưa? (y/n): "

if /i not "%DEPLOYED%"=="y" (
    echo.
    echo ❌ Nếu lỗi, xem logs và báo lại!
    pause
    exit /b
)

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 7: LẤY RAILWAY URL
echo ═══════════════════════════════════════════════════════════
echo.

echo 1. Tab "Settings"
echo 2. Phần "Networking"
echo 3. Nếu chưa có domain:
echo    - Click "Generate Domain"
echo 4. Copy URL (dạng: https://xxx.up.railway.app)
echo.
pause

set /p RAILWAY_URL="Nhập Railway URL: "

if "%RAILWAY_URL%"=="" (
    echo ❌ URL không được để trống!
    pause
    exit /b
)

echo.
echo ✅ Railway URL: %RAILWAY_URL%
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 8: TEST BACKEND
echo ═══════════════════════════════════════════════════════════
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
echo BƯỚC 9: KẾT NỐI FRONTEND
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
git commit -m "Connect to Railway backend: %RAILWAY_URL%"
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
echo 💝 Tất cả đã online và hoạt động!
echo.
echo ╔═══════════════════════════════════════════════════════════╗
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
echo    → Nếu kỷ niệm xuất hiện = Backend kết nối OK! ✅
echo.
echo 6. Click nút 🎬 (header)
echo 7. Quét QR code
echo 8. Slideshow với 70 ảnh + nhạc "Lễ Đường"
echo.
echo    → Nếu slideshow chạy = Hoàn hảo! ✅
echo.
echo ═══════════════════════════════════════════════════════════
echo 🎉 CHÚC MỪNG! ĐÃ DEPLOY THÀNH CÔNG!
echo ═══════════════════════════════════════════════════════════
echo.
pause
