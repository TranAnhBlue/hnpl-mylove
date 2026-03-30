@echo off
chcp 65001 >nul
cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║         🔧 FIX MONGODB CONNECTION STRING                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo ❌ LỖI HIỆN TẠI:
echo    "bad auth : authentication failed"
echo.
echo 🔍 NGUYÊN NHÂN:
echo    - Username hoặc password sai
echo    - Connection string không đúng format
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 1: LẤY CONNECTION STRING ĐÚNG TỪ MONGODB ATLAS
echo ═══════════════════════════════════════════════════════════
echo.

echo 🌐 Mở MongoDB Atlas...
start https://cloud.mongodb.com
echo.

echo Làm theo các bước sau:
echo.
echo 1. Đăng nhập MongoDB Atlas
echo.
echo 2. Chọn cluster: cluster0
echo.
echo 3. Click nút "Connect"
echo.
echo 4. Chọn "Connect your application"
echo.
echo 5. Driver: Node.js
echo    Version: 5.5 or later
echo.
echo 6. Copy connection string (dạng):
echo    mongodb+srv://^<username^>:^<password^>@cluster0.02q3jqa.mongodb.net/aniversary
echo.
echo 7. QUAN TRỌNG: Thay ^<password^> bằng password THẬT của user
echo    (Không phải password đăng nhập Atlas!)
echo.
pause

echo.
set /p MONGODB_URI="Nhập MongoDB Connection String đầy đủ: "

if "%MONGODB_URI%"=="" (
    echo ❌ Connection string không được để trống!
    pause
    exit /b
)

echo.
echo ✅ Connection string đã nhập:
echo %MONGODB_URI%
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 2: KIỂM TRA FORMAT
echo ═══════════════════════════════════════════════════════════
echo.

echo Kiểm tra connection string có đúng format không:
echo.
echo ✅ Phải có dạng:
echo    mongodb+srv://username:password@cluster0.02q3jqa.mongodb.net/aniversary
echo.
echo ❌ KHÔNG được có:
echo    - 2 dấu @@ (chỉ 1 dấu @)
echo    - ^<password^> (phải thay bằng password thật)
echo    - Khoảng trắng
echo.

set /p CONFIRM="Connection string có đúng format không? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo.
    echo ❌ Vui lòng kiểm tra lại và chạy lại script!
    pause
    exit /b
)

echo.
echo ═══════════════════════════════════════════════════════════
echo BƯỚC 3: CẬP NHẬT SERVER/.ENV
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
type server\.env
echo.

echo ═══════════════════════════════════════════════════════════
echo BƯỚC 4: TEST CONNECTION
echo ═══════════════════════════════════════════════════════════
echo.

echo 🧪 Test kết nối MongoDB...
echo.
echo Khởi động server (Ctrl+C để dừng)...
echo.
pause

cd server
npm start
