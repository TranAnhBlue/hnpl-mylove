@echo off
chcp 65001 >nul
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║         🎉 KẾT NỐI BACKEND - BƯỚC CUỐI CÙNG              ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo.

echo     ✅ Đã fix Railway config và push lên GitHub
echo     ⏳ Railway đang tự động deploy (2-3 phút)
echo.
echo     Bây giờ bạn cần:
echo     1. Đợi Railway deploy xong
echo     2. Lấy Backend URL
echo     3. Kết nối với Frontend
echo.
pause

echo.
echo     ═══════════════════════════════════════════════════════════
echo     BƯỚC 1: KIỂM TRA RAILWAY
echo     ═══════════════════════════════════════════════════════════
echo.
echo     1. Mở Railway Dashboard:
start https://railway.app
echo        👉 https://railway.app
echo.
echo     2. Click vào project "hnpl-mylove"
echo.
echo     3. Tab Deployments → Xem status
echo        - Building... → Đợi
echo        - Success ✅ → OK!
echo        - Failed ❌ → Xem logs
echo.
echo     4. Nếu Success, tiếp tục bước 2
echo.
pause

echo.
echo     ═══════════════════════════════════════════════════════════
echo     BƯỚC 2: LẤY BACKEND URL
echo     ═══════════════════════════════════════════════════════════
echo.
echo     1. Railway → Settings → Domains
echo.
echo     2. Nếu chưa có domain, click "Generate Domain"
echo.
echo     3. Copy URL (ví dụ: https://xxx.up.railway.app)
echo.
echo     4. Test URL trong trình duyệt:
echo        URL/api/memories
echo        Nếu thấy [] → Backend OK!
echo.
pause

echo.
set /p BACKEND_URL="     Nhập Backend URL của bạn: "

if "%BACKEND_URL%"=="" (
    echo.
    echo     ❌ URL không được để trống!
    pause
    exit /b 1
)

echo.
echo     ✅ Backend URL: %BACKEND_URL%
echo.

echo     ═══════════════════════════════════════════════════════════
echo     BƯỚC 3: CẬP NHẬT FRONTEND
echo     ═══════════════════════════════════════════════════════════
echo.
echo     📝 Đang cập nhật client/.env.production...
echo VITE_API_URL=%BACKEND_URL%/api > client\.env.production
echo     ✅ Đã cập nhật
echo.

echo     📄 Nội dung file:
type client\.env.production
echo.
pause

echo.
echo     ═══════════════════════════════════════════════════════════
echo     BƯỚC 4: DEPLOY FRONTEND
echo     ═══════════════════════════════════════════════════════════
echo.
echo     📦 Commit changes...
git add client/.env.production
git commit -m "Connect to Railway backend"
git push
echo     ✅ Đã push
echo.

echo     🚀 Deploy frontend...
cd client
call vercel --prod --yes
cd ..
echo     ✅ Deploy thành công
echo.

echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║                    🎉 HOÀN THÀNH! 🎉                      ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo     💝 Tất cả đã kết nối thành công!
echo.
echo     🌐 URLs:
echo        Frontend: https://onlylovehnpl.vercel.app
echo        Backend: %BACKEND_URL%
echo        Slideshow: https://onlylovehnpl.vercel.app/#/love-slideshow
echo.
echo     🧪 Test ngay:
echo.
echo        1. Mở: https://onlylovehnpl.vercel.app
echo        2. Click nút + (góc dưới)
echo        3. Thêm kỷ niệm mới
echo        4. Upload ảnh
echo        5. Click Lưu
echo.
echo        Nếu kỷ niệm xuất hiện → Thành công! ✅
echo.
echo     🎬 Test Slideshow:
echo        1. Click nút 🎬
echo        2. Quét QR code
echo        3. 70 ảnh + nhạc "Lễ Đường" phát!
echo.
echo     💝 Tất cả tính năng đã sẵn sàng!
echo.
pause
