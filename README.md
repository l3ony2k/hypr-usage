# HyprLab Usage Dashboard

A simple web dashboard to view your HyprLab API usage statistics with caching and table-based data visualization.

## Features

- **Table-based data display** - No more growing charts, clean tabular format
- **Smart caching** - Data is cached for 30 minutes to reduce API calls
- **Manual refresh** - Force refresh data when needed
- **Date range filtering** - View usage for specific time periods
- **Model filtering** - Search and filter models by name
- **Usage filtering** - Hide zero usage or small amounts
- **Responsive design** - Works on desktop and mobile

## Quick Start

### Step 1: Configure API Key
Choose one of these methods:

**Option A: Using config.py (Recommended)**
```bash
cp config.example.py config.py
# Edit config.py and set your API key
```

**Option B: Using environment variables**
```bash
cp .env.example .env
# Edit .env and set HYPRLAB_API_KEY
```

**Option C: Set environment variable directly**
```bash
export HYPRLAB_API_KEY="your-api-key-here"
```

### Step 2: Launch Dashboard

**Option 1: Double-click launcher (Recommended)**
1. Double-click `🚀 Launch Dashboard.bat`
2. The script will automatically:
   - Check Python installation and configuration
   - Install required packages
   - Start the server
   - Open your browser
   - Show the dashboard

**Option 2: Manual launch**
1. Install Python if not already installed
2. Install requirements: `pip install -r requirements.txt`
3. Run the app: `python app.py`
4. Open browser to: http://127.0.0.1:5000

## Date Range Options

- **Yesterday** - View usage for yesterday only
- **7 Days** - Last 7 days (default)
- **14 Days** - Last 14 days  
- **30 Days** - Last 30 days
- **90 Days** - Last 90 days
- **Custom Range** - Select specific start and end dates

## Filtering Options

- **Search models** - Type to filter models by name
- **Hide $0.00 usage** - Hide models with no usage (enabled by default)
- **Hide usage under $1.00** - Hide models with minimal usage

## Cache System

- Data is automatically cached for 30 minutes
- Cache status is shown next to the refresh button
- Green = cached data is valid
- Red = cached data has expired
- Click "Refresh Data" to force fetch new data

## Files

- `app.py` - Flask web server
- `templates/index.html` - Dashboard HTML/CSS/JavaScript
- `requirements.txt` - Python dependencies
- `launch_dashboard.bat` - Windows batch launcher
- `launch_dashboard.ps1` - PowerShell launcher (more reliable)
- `🚀 Launch Dashboard.bat` - Main launcher (tries PowerShell first)

## Troubleshooting

### Python not found
- Install Python from https://python.org
- Make sure Python is added to your PATH

### Port 5000 already in use
- The launcher will automatically kill existing processes on port 5000
- Or manually kill processes using port 5000

### Permission errors with PowerShell
- Right-click `🚀 Launch Dashboard.bat` and "Run as administrator"
- Or use the batch version directly: `launch_dashboard.bat`

### API errors
- Check your API key in `app.py`
- Verify your internet connection
- Check HyprLab API status

## API Configuration

The API key is now configurable and secure. Choose your preferred method:

### Method 1: config.py (Recommended)
```python
# config.py
API_BASE_URL = "https://api.hyprlab.io/v1"
API_KEY = "your-actual-api-key-here"
CACHE_DURATION_MINUTES = 30
DEBUG = True
HOST = "0.0.0.0"
PORT = 5000
```

### Method 2: Environment Variables
```bash
# .env file or system environment
HYPRLAB_API_KEY=your-actual-api-key-here
HYPRLAB_API_BASE_URL=https://api.hyprlab.io/v1
CACHE_DURATION_MINUTES=30
DEBUG=True
HOST=0.0.0.0
PORT=5000
```

### Security Features
- ✅ API keys are never committed to git
- ✅ Multiple configuration methods supported
- ✅ Automatic validation on startup
- ✅ Masked API key display in logs

## Cache Configuration

Modify cache duration in `app.py`:

```python
CACHE_DURATION = timedelta(minutes=30)  # Change to desired duration
```