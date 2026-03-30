@echo off
chcp 65001 >nul
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║                                                           ║
echo     ║         🚀 SETUP BACKEND - HƯỚNG DẪN TỪ TỪNG BƯỚC       ║
echo     ║                                                           ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo.

echo     Script này sẽ hướng dẫn bạn:
echo     1. Setup MongoDB Atlas (Database)
echo     2. Deploy lên Railway (Backend)
echo     3. Kết nối với Frontend
echo.
echo     Thời gian: ~15 phút
echo.
pause

:step1
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║         BƯỚC 1: SETUP MONGODB ATLAS                       ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo     1. Mở trình duyệt, truy cập:
echo        👉 https://www.mongodb.com/cloud/atlas/register
echo.
echo     2. Sign up với email hoặc Google
echo.
echo     3. Chọn plan FREE (M0 Sandbox)
echo.
echo     4. Tạo Cluster:
echo        - Provider: AWS
echo        - Region: Singapore
echo        - Cluster Name: onlylove-cluster
echo.
echo     5. Tạo Database User:
echo        - Username: onlylove
echo        - Password: Autogenerate (COPY PASSWORD!)
echo        - Privileges: Read and write to any database
echo.
echo     6. Whitelist IP:
echo        - Add IP Address
echo        - Allow Access from Anywhere (0.0.0.0/0)
echo.
echo     7. Lấy Connection String:
echo        - Database → Connect → Drivers
echo        - Copy connection string
echo        - Thay ^<password^> bằng password thật
echo        - Thêm /anniversary vào cuối
echo.
echo     Ví dụ:
echo     mongodb+srv://onlylove:PASSWORD@cluster.xxxxx.mongodb.net/anniversary
echo.
pause

echo.
echo     ═══════════════════════════════════════════════════════════
echo     Nhập MongoDB Connection String của bạn:
echo     ═══════════════════════════════════════════════════════════
echo.
set /p MONGODB_URI="Connection String: "
echo.
echo     ✅ Đã lưu MongoDB URI
echo.
pause

:step2
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║         BƯỚC 2: DEPLOY LÊN RAILWAY                        ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo     1. Mở trình duyệt, truy cập:
echo        👉 https://railway.app
echo.
echo     2. Login with GitHub
echo.
echo     3. New Project → Deploy from GitHub repo
echo.
echo     4. Chọn repo của bạn
echo.
echo     5. Settings → Root Directory: server
echo.
echo     6. Variables → Add New Variable:
echo.
echo        PORT = 5001
echo.
echo        MONGODB_URI = %MONGODB_URI%
echo.
echo        CORS_ORIGIN = https://onlylovehnpl.vercel.app
echo.
echo        NODE_ENV = production
echo.
echo     7. Đợi deploy xong (2-3 phút)
echo.
echo     8. Settings → Generate Domain
echo.
echo     9. Copy domain (ví dụ: https://xxx.up.railway.app)
echo.
pause

echo.
echo     ═══════════════════════════════════════════════════════════
echo     Nhập Backend URL của bạn (từ Railway):
echo     ═══════════════════════════════════════════════════════════
echo.
set /p BACKEND_URL="Backend URL: "
echo.
echo     ✅ Đã lưu Backend URL
echo.
pause

:step3
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║         BƯỚC 3: KẾT NỐI FRONTEND                          ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo     Đang cập nhật frontend config...
echo.

REM Update .env.production
echo VITE_API_URL=%BACKEND_URL%/api > client\.env.production
echo     ✅ Đã cập nhật client/.env.production
echo.

echo     Đang redeploy frontend...
echo.
cd client
call vercel --prod --yes
if %errorlevel% neq 0 (
    echo     ❌ Redeploy thất bại
    echo     👉 Vui lòng chạy thủ công: cd client ^&^& vercel --prod
    cd ..
    pause
    exit /b 1
)
cd ..
echo.
echo     ✅ Frontend đã redeploy
echo.
pause

:step4
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║         BƯỚC 4: TEST                                      ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo     Test Backend:
echo     👉 %BACKEND_URL%/api/memories
echo.
echo     Nếu thấy [] (mảng rỗng) → Backend OK! ✅
echo.
echo     Test Frontend:
echo     👉 https://onlylovehnpl.vercel.app
echo.
echo     1. Click nút + (góc dưới)
echo     2. Thêm kỷ niệm mới
echo     3. Upload ảnh
echo     4. Click Lưu
echo.
echo     Nếu kỷ niệm xuất hiện → Kết nối OK! ✅
echo.
echo     Test Slideshow:
echo     👉 https://onlylovehnpl.vercel.app/love-slideshow
echo.
echo     70 ảnh + nhạc "Lễ Đường" phát → Hoàn hảo! ✅
echo.
pause

:complete
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║                    ✨ HOÀN THÀNH! ✨                       ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo     🎉 Backend và Frontend đã kết nối thành công!
echo.
echo     🌐 URLs:
echo        Frontend: https://onlylovehnpl.vercel.app
echo        Backend: %BACKEND_URL%
echo        Slideshow: https://onlylovehnpl.vercel.app/love-slideshow
echo.
echo     📊 Thông tin đã lưu:
echo        MongoDB URI: %MONGODB_URI%
echo        Backend URL: %BACKEND_URL%
echo.
echo     💝 Tất cả tính năng đã sẵn sàng:
echo        ✅ Thêm/Sửa/Xóa kỷ niệm
echo        ✅ Upload ảnh
echo        ✅ Slideshow 70 ảnh + nhạc
echo        ✅ QR code
echo        ✅ Tìm kiếm, lọc
echo        ✅ Dark mode
echo        ✅ Thống kê
echo.
echo     🔄 Cập nhật sau này:
echo        - Chỉ cần git push
echo        - Railway và Vercel tự động deploy!
echo.
echo     📖 Xem thêm:
echo        - DEPLOY-BACKEND-STEP-BY-STEP.md
echo        - DEPLOY-ONLYLOVEHNPL.md
echo.
pause
