@echo off
chcp 65001 >nul
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║                                                           ║
echo     ║         💕 DEPLOY ỨNG DỤNG ONLYLOVEHNPL 💕              ║
echo     ║                                                           ║
echo     ║         🎬 70 Ảnh Kỷ Niệm + Nhạc "Lễ Đường"            ║
echo     ║                                                           ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo.

echo     Chọn phương án deploy:
echo.
echo     [1] 🚀 Deploy Frontend (Nhanh - 5 phút)
echo         → Deploy lên onlylovehnpl.vercel.app
echo         → Slideshow 70 ảnh hoạt động ngay
echo         → Chưa có backend (chưa lưu kỷ niệm được)
echo.
echo     [2] 🌐 Deploy Toàn Bộ (Frontend + Backend)
echo         → Deploy frontend lên Vercel
echo         → Hướng dẫn deploy backend lên Railway
echo         → Setup MongoDB Atlas
echo         → Đầy đủ tính năng
echo.
echo     [3] 📖 Xem Hướng Dẫn Chi Tiết
echo.
echo     [4] ❌ Thoát
echo.
echo.

set /p choice="     Chọn [1-4]: "

if "%choice%"=="1" goto deploy_frontend
if "%choice%"=="2" goto deploy_all
if "%choice%"=="3" goto show_guide
if "%choice%"=="4" goto end

echo.
echo     ❌ Lựa chọn không hợp lệ!
timeout /t 2 >nul
goto start

:deploy_frontend
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║              🚀 DEPLOY FRONTEND                           ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
call deploy-onlylove.bat
goto end

:deploy_all
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║              🌐 DEPLOY TOÀN BỘ                            ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo     Bước 1: Deploy Frontend
echo     ═══════════════════════════════════════════════════════════
echo.
call deploy-all.bat
echo.
echo.
echo     Bước 2: Deploy Backend
echo     ═══════════════════════════════════════════════════════════
echo.
call deploy-backend.bat
goto end

:show_guide
cls
echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║              📖 HƯỚNG DẪN                                 ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo     📁 Các file hướng dẫn:
echo.
echo     ⭐ START-HERE.md
echo        → Bắt đầu từ đây (đơn giản nhất)
echo.
echo     🎯 DEPLOY-ONLYLOVEHNPL.md
echo        → Hướng dẫn chi tiết cho domain của bạn
echo.
echo     ⚡ QUICK-START-DEPLOY.md
echo        → Deploy nhanh trong 10 phút
echo.
echo     📖 HUONG-DAN-DEPLOY.md
echo        → Hướng dẫn đầy đủ, chi tiết kỹ thuật
echo.
echo     ✅ DEPLOY-CHECKLIST.md
echo        → Checklist từng bước
echo.
echo.
echo     💡 Mở file bằng Notepad hoặc VS Code để đọc
echo.
pause
goto start

:end
echo.
echo     💝 Cảm ơn bạn đã sử dụng!
echo.
timeout /t 2 >nul
exit /b 0

:start
cls
goto :eof
