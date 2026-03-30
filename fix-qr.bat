@echo off
chcp 65001 >nul
echo ╔════════════════════════════════════════════════════════════╗
echo ║         🔧 FIX LỖI QR SLIDESHOW                           ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo Đang fix lỗi QR slideshow sau deploy...
echo.

REM Check if vercel.json exists
echo [1/4] 🔍 Kiểm tra file vercel.json...
if exist "client\vercel.json" (
    echo ✅ File client\vercel.json đã tồn tại
) else (
    echo ⚠️ File chưa có, đang tạo...
    echo { > client\vercel.json
    echo   "rewrites": [ >> client\vercel.json
    echo     { >> client\vercel.json
    echo       "source": "/(.*)", >> client\vercel.json
    echo       "destination": "/index.html" >> client\vercel.json
    echo     } >> client\vercel.json
    echo   ] >> client\vercel.json
    echo } >> client\vercel.json
    echo ✅ Đã tạo file
)
echo.

REM Show file content
echo 📄 Nội dung file:
type client\vercel.json
echo.
pause

REM Commit
echo [2/4] 📦 Commit changes...
git add client/vercel.json
git commit -m "Fix slideshow routing for Vercel"
if %errorlevel% equ 0 (
    echo ✅ Đã commit
    git push
    if %errorlevel% equ 0 (
        echo ✅ Đã push lên GitHub
    ) else (
        echo ⚠️ Push thất bại, có thể không có thay đổi
    )
) else (
    echo ⚠️ Không có thay đổi để commit
)
echo.

REM Redeploy
echo [3/4] 🚀 Redeploy frontend...
cd client
call vercel --prod --yes
if %errorlevel% neq 0 (
    echo ❌ Deploy thất bại
    cd ..
    pause
    exit /b 1
)
cd ..
echo ✅ Deploy thành công
echo.

REM Test
echo [4/4] 🧪 Test...
echo.
echo Đang mở slideshow trong trình duyệt...
start https://onlylovehnpl.vercel.app/love-slideshow
echo.
echo ⏳ Đợi 5 giây để trang load...
timeout /t 5 /nobreak >nul
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║                    ✨ HOÀN THÀNH! ✨                       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🎉 Đã fix xong!
echo.
echo 🧪 Test ngay:
echo.
echo    1. Trình duyệt đã mở slideshow
echo       👉 https://onlylovehnpl.vercel.app/love-slideshow
echo.
echo    2. Nếu thấy 70 ảnh + nhạc → Fix thành công! ✅
echo.
echo    3. Test QR code:
echo       - Mở: https://onlylovehnpl.vercel.app
echo       - Click nút 🎬
echo       - Quét QR
echo       - Slideshow mở!
echo.
echo 💝 Tất cả đã sẵn sàng!
echo.
pause
