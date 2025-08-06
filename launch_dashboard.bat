@echo off
title HyprLab Usage Dashboard
color 0A
echo ========================================
echo    HyprLab Usage Dashboard Launcher
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Check if Python is installed
echo [1/5] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python from https://python.org and try again
    echo.
    pause
    exit /b 1
)
echo [OK] Python found

REM Check if required files exist
echo [2/5] Checking required files...
if not exist "app.py" (
    echo [ERROR] app.py not found in current directory
    pause
    exit /b 1
)
if not exist "requirements.txt" (
    echo [ERROR] requirements.txt not found in current directory
    pause
    exit /b 1
)

REM Check configuration
if not exist "config.py" (
    if not exist ".env" (
        echo [WARNING] No configuration found
        echo Please copy config.example.py to config.py and set your API key
        echo Or copy .env.example to .env and set HYPRLAB_API_KEY
        echo.
        echo Opening config.example.py for reference...
        if exist "config.example.py" (
            type config.example.py
        )
        echo.
        pause
        exit /b 1
    )
)
echo [OK] Required files and configuration found

REM Install/update requirements
echo [3/5] Installing/checking requirements...
pip install -r requirements.txt
if errorlevel 1 (
    echo [WARNING] Some packages may not have installed correctly
    echo Continuing anyway...
)
echo [OK] Requirements processed

REM Kill any existing Python processes on port 5000
echo [4/5] Cleaning up any existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

REM Start the Flask app
echo [5/5] Starting Flask server...
start /B python app.py

REM Wait for server to start
echo Waiting for server to start...
timeout /t 5 /nobreak >nul

REM Test if server is running
echo Testing server connection...
curl -s http://127.0.0.1:5000 >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Server may not be ready yet, opening browser anyway...
) else (
    echo [OK] Server is responding
)

REM Open browser
echo Opening browser...
start http://127.0.0.1:5000

echo.
echo ========================================
echo Dashboard is now running at:
echo http://127.0.0.1:5000
echo ========================================
echo.
echo Press any key to stop the server and exit...
pause >nul

REM Cleanup
echo Stopping server...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
echo Server stopped. Goodbye!