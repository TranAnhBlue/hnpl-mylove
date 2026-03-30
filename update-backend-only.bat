@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║              🚂 CẬP NHẬT BACKEND ONLY                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Dùng script này khi:
echo - Chỉ sửa code backend (API, database logic)
echo - Frontend không thay đổi
echo.

echo 📦 Commit backend changes...
git add server/
git status
echo.

set /p COMMIT_MSG="Nhập commit message: "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Update backend

git commit -m "%COMMIT_MSG%"
echo.

echo 🚀 Push lên GitHub (Railway tự động deploy)...
git push
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║                    ✅ XONG!                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Railway đang tự động deploy backend (1-2 phút)
echo.
echo Kiểm tra tại: https://railway.app
echo Project: hnpl-mylove
echo.
echo Frontend vẫn hoạt động bình thường!
echo.
pause
