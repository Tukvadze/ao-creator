@echo off
title Stop AO Creator
echo Stopping services...

REM Stop backend (port 3001)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do (
    taskkill /F /PID %%a 2>nul
)

REM Stop frontend (port 5173)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173" ^| find "LISTENING"') do (
    taskkill /F /PID %%a 2>nul
)

echo Services stopped.
timeout /t 2 /nobreak >nul
