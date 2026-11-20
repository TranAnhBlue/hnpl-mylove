@echo off
echo ========================================
echo   DEPLOY FRONTEND TO VERCEL
echo ========================================
echo.

cd client

echo [1/3] Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Deploying to Vercel...
call vercel --prod
if %errorlevel% neq 0 (
    echo Deploy failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   DEPLOY SUCCESSFUL!
echo ========================================
echo.
echo Website: https://onlylovehnpl.vercel.app
echo.
pause
