@echo off
chcp 65001 >nul
echo ╔════════════════════════════════════════════════════════════╗
echo ║         🔗 KẾT NỐI FRONTEND VỚI BACKEND                   ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo Bạn đã có Railway và MongoDB Atlas rồi!
echo.
echo Bước này sẽ kết nối frontend với backend.
echo.

REM Get backend URL
echo ═══════════════════════════════════════════════════════════
echo Lấy Backend URL từ Railway:
echo ═══════════════════════════════════════════════════════════
echo.
echo 1. Vào Railway Dashboard: https://railway.app
echo 2. Click vào service "hnpl-mylove"
echo 3. Click Settings → Domains
echo 4. Copy URL (ví dụ: https://xxx.up.railway.app)
echo.
echo Nếu chưa có domain, click "Generate Domain"
echo.
pause

echo.
set /p BACKEND_URL="Nhập Backend URL của bạn: "

REM Validate URL
if "%BACKEND_URL%"=="" (
    echo ❌ URL không được để trống!
    pause
    exit /b 1
)

echo.
echo ✅ Backend URL: %BACKEND_URL%
echo.

REM Update .env.production
echo 📝 Đang cập nhật client/.env.production...
echo VITE_API_URL=%BACKEND_URL%/api > client\.env.production
echo.
echo ✅ Đã cập nhật config
echo.

REM Show file content
echo 📄 Nội dung file:
type client\.env.production
echo.
pause

REM Commit changes
echo.
echo ═══════════════════════════════════════════════════════════
echo Git Commit
echo ═══════════════════════════════════════════════════════════
echo.
echo Bạn có muốn commit changes? (y/n)
set /p COMMIT="Chọn: "

if /i "%COMMIT%"=="y" (
    echo.
    echo 📦 Đang commit...
    git add client/.env.production
    git commit -m "Update backend URL"
    git push
    echo.
    echo ✅ Đã push lên GitHub
    echo.
)

REM Redeploy frontend
echo.
echo ═══════════════════════════════════════════════════════════
echo Redeploy Frontend
echo ═══════════════════════════════════════════════════════════
echo.
echo Bạn có muốn redeploy frontend ngay? (y/n)
set /p DEPLOY="Chọn: "

if /i "%DEPLOY%"=="y" (
    echo.
    echo 🚀 Đang redeploy...
    cd client
    call vercel --prod --yes
    cd ..
    echo.
    echo ✅ Frontend đã redeploy
    echo.
)

REM Test
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    ✨ HOÀN THÀNH! ✨                       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🎉 Frontend và Backend đã kết nối!
echo.
echo 🌐 URLs:
echo    Frontend: https://onlylovehnpl.vercel.app
echo    Backend: %BACKEND_URL%
echo    API: %BACKEND_URL%/api
echo.
echo 🧪 Test ngay:
echo.
echo    1. Test Backend:
echo       👉 %BACKEND_URL%/api/memories
echo       Nếu thấy [] → Backend OK!
echo.
echo    2. Test Frontend:
echo       👉 https://onlylovehnpl.vercel.app
echo       Thêm kỷ niệm mới → Nếu lưu được → Kết nối OK!
echo.
echo    3. Test Slideshow:
echo       👉 https://onlylovehnpl.vercel.app/love-slideshow
echo       70 ảnh + nhạc → Hoàn hảo!
echo.
echo 💝 Tất cả đã sẵn sàng!
echo.
pause
