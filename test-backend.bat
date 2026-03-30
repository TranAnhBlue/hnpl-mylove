@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║              🧪 TEST RAILWAY BACKEND                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Backend URL: https://onlylove-backend-production.up.railway.app
echo.

echo 🔍 Đang test backend...
echo.

curl -s https://onlylove-backend-production.up.railway.app/api/memories

echo.
echo.
echo ═══════════════════════════════════════════════════════════
echo KẾT QUẢ:
echo ═══════════════════════════════════════════════════════════
echo.
echo Nếu thấy [] hoặc [...] → Backend hoạt động ✅
echo Nếu thấy lỗi hoặc không có gì → Backend chết ❌
echo.
echo Nếu backend chết, chạy: deploy-stable.bat
echo.
pause
