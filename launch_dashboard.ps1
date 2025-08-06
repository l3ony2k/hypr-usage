# HyprLab Usage Dashboard Launcher (PowerShell)
param(
    [switch]$NoWait
)

$Host.UI.RawUI.WindowTitle = "HyprLab Usage Dashboard"

Write-Host "========================================" -ForegroundColor Green
Write-Host "   HyprLab Usage Dashboard Launcher" -ForegroundColor Green  
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Change to script directory
Set-Location $PSScriptRoot

# Check Python installation
Write-Host "[1/5] Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "[OK] $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python from https://python.org and try again" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check required files
Write-Host "[2/5] Checking required files..." -ForegroundColor Yellow
$requiredFiles = @("app.py", "requirements.txt", "templates/index.html")
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "[ERROR] $file not found" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Check configuration
if (-not (Test-Path "config.py") -and -not (Test-Path ".env")) {
    Write-Host "[WARNING] No configuration found" -ForegroundColor Yellow
    Write-Host "Please copy config.example.py to config.py and set your API key" -ForegroundColor Yellow
    Write-Host "Or copy .env.example to .env and set HYPRLAB_API_KEY" -ForegroundColor Yellow
    Write-Host ""
    if (Test-Path "config.example.py") {
        Write-Host "Example configuration:" -ForegroundColor Cyan
        Get-Content "config.example.py" | Write-Host -ForegroundColor Gray
    }
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[OK] Required files and configuration found" -ForegroundColor Green

# Install requirements
Write-Host "[3/5] Installing/checking requirements..." -ForegroundColor Yellow
try {
    pip install -r requirements.txt | Out-Null
    Write-Host "[OK] Requirements processed" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] Some packages may not have installed correctly" -ForegroundColor Yellow
    Write-Host "Continuing anyway..." -ForegroundColor Yellow
}

# Kill existing processes on port 5000
Write-Host "[4/5] Cleaning up any existing processes..." -ForegroundColor Yellow
try {
    $processes = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    foreach ($pid in $processes) {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
} catch {
    # Ignore errors
}

# Start Flask app
Write-Host "[5/5] Starting Flask server..." -ForegroundColor Yellow
$flaskProcess = Start-Process python -ArgumentList "app.py" -PassThru -WindowStyle Hidden

# Wait for server to start
Write-Host "Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Test server connection
Write-Host "Testing server connection..." -ForegroundColor Yellow
$maxRetries = 10
$retryCount = 0
$serverReady = $false

while ($retryCount -lt $maxRetries -and -not $serverReady) {
    try {
        $response = Invoke-WebRequest -Uri "http://127.0.0.1:5000" -TimeoutSec 2 -ErrorAction Stop
        $serverReady = $true
        Write-Host "[OK] Server is responding" -ForegroundColor Green
    } catch {
        $retryCount++
        Start-Sleep -Seconds 1
    }
}

if (-not $serverReady) {
    Write-Host "[WARNING] Server may not be ready yet, opening browser anyway..." -ForegroundColor Yellow
}

# Open browser
Write-Host "Opening browser..." -ForegroundColor Yellow
Start-Process "http://127.0.0.1:5000"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Dashboard is now running at:" -ForegroundColor Green
Write-Host "http://127.0.0.1:5000" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

if (-not $NoWait) {
    Write-Host "Press any key to stop the server and exit..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    # Cleanup
    Write-Host "Stopping server..." -ForegroundColor Yellow
    if ($flaskProcess -and -not $flaskProcess.HasExited) {
        $flaskProcess.Kill()
    }
    
    # Kill any remaining processes on port 5000
    try {
        $processes = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
        foreach ($pid in $processes) {
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
    } catch {
        # Ignore errors
    }
    
    Write-Host "Server stopped. Goodbye!" -ForegroundColor Green
}