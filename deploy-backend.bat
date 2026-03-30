@echo off
chcp 65001 >nul
echo ╔════════════════════════════════════════════════════════════╗
echo ║           🚀 HƯỚNG DẪN DEPLOY BACKEND                      ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo Backend cần deploy lên Railway vì cần:
echo    - MongoDB database
echo    - File storage
echo    - Always-on server
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 1: SETUP MONGODB ATLAS (Database)
echo ═══════════════════════════════════════════════════════════
echo.
echo 1. Truy cập: https://mongodb.com/cloud/atlas
echo 2. Sign up / Login
echo 3. Create Free Cluster
echo 4. Database Access → Add User:
echo       Username: onlylove
echo       Password: [tạo password mạnh]
echo 5. Network Access → Add IP: 0.0.0.0/0
echo 6. Connect → Copy connection string:
echo       mongodb+srv://onlylove:PASSWORD@cluster.mongodb.net/anniversary
echo.
echo 💾 Lưu connection string lại!
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 2: DEPLOY LÊN RAILWAY
echo ═══════════════════════════════════════════════════════════
echo.
echo 1. Truy cập: https://railway.app
echo 2. Login với GitHub
echo 3. New Project → Deploy from GitHub repo
echo 4. Chọn repo của bạn
echo 5. Chọn thư mục: server
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 3: CẤU HÌNH ENVIRONMENT VARIABLES
echo ═══════════════════════════════════════════════════════════
echo.
echo Trong Railway dashboard → Variables, thêm:
echo.
echo PORT=5001
echo MONGODB_URI=mongodb+srv://onlylove:PASSWORD@cluster.mongodb.net/anniversary
echo CORS_ORIGIN=https://onlylovehnpl.vercel.app
echo NODE_ENV=production
echo.
echo 💡 Thay PASSWORD bằng password MongoDB của bạn
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 4: LẤY BACKEND URL
echo ═══════════════════════════════════════════════════════════
echo.
echo 1. Railway → Settings → Generate Domain
echo 2. Copy URL (ví dụ: https://onlylove-backend.up.railway.app)
echo 3. Lưu lại URL này
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 5: CẬP NHẬT FRONTEND
echo ═══════════════════════════════════════════════════════════
echo.
echo Nhập Backend URL của bạn (từ Railway):
set /p BACKEND_URL="Backend URL: "
echo.

REM Update .env.production
echo VITE_API_URL=%BACKEND_URL%/api > client\.env.production
echo ✅ Đã cập nhật client/.env.production
echo.

REM Redeploy frontend
echo 🚀 Redeploy frontend với backend URL mới...
cd client
call vercel --prod --name onlylovehnpl --yes
cd ..
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║                    ✨ HOÀN THÀNH! ✨                       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🎉 Backend và Frontend đã kết nối!
echo.
echo 🌐 URLs:
echo    👉 Frontend: https://onlylovehnpl.vercel.app
echo    👉 Backend: %BACKEND_URL%
echo    👉 Slideshow: https://onlylovehnpl.vercel.app/love-slideshow
echo.
echo 🧪 Test:
echo    1. Mở: https://onlylovehnpl.vercel.app
echo    2. Thêm kỷ niệm mới
echo    3. Upload ảnh
echo    4. Xem slideshow
echo.
echo 💝 Tất cả đã sẵn sàng!
echo.
pause
