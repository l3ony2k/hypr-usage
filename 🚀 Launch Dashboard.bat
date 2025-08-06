@echo off
REM Try PowerShell first (more reliable), fallback to batch
powershell -ExecutionPolicy Bypass -File "%~dp0launch_dashboard.ps1" 2>nul
if errorlevel 1 (
    REM PowerShell failed, use batch version
    call "%~dp0launch_dashboard.bat"
)