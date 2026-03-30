@echo off
chcp 65001 >nul
echo ╔════════════════════════════════════════════════════════════╗
echo ║         🧪 TEST BUILD LOCAL                               ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo [1/3] 🏗️ Build frontend...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build thất bại
    cd ..
    pause
    exit /b 1
)
echo ✅ Build thành công
echo.

echo [2/3] 📁 Kiểm tra files...
echo.
echo Checking dist folder:
dir dist
echo.
echo Checking dist/index.html:
if exist "dist\index.html" (
    echo ✅ index.html tồn tại
) else (
    echo ❌ index.html không tồn tại
    cd ..
    pause
    exit /b 1
)
echo.

echo [3/3] 🌐 Preview local...
echo.
echo Đang mở preview server...
echo.
call npx serve dist -l 8080
cd ..
