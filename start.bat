@echo off
title AO Creator
echo ========================================
echo       AO Creator - Starting
echo ========================================
echo.

REM Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo [1/3] Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Check if Python venv exists
if not exist "backend\confluence-agent\venv" (
    echo [2/3] Setting up Python environment...
    cd backend\confluence-agent
    "C:\Users\v_tukvadze\AppData\Local\Programs\Python\Python314\python.exe" -m venv venv
    venv\Scripts\pip.exe install -r requirements.txt
    cd ..\..
)

REM Start backend in hidden mode
echo [3/3] Starting services...
start "" /B wscript.exe "%~dp0start-backend-hidden.vbs"

REM Wait for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend
echo.
echo ========================================
echo   Opening browser in 5 seconds...
echo   URL: http://localhost:5173
echo ========================================
echo.

REM Open browser after delay
start "" /B cmd /c "timeout /t 5 /nobreak >nul && start http://localhost:5173"

npm run dev
