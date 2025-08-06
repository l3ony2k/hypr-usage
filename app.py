from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import requests
import json
import os
import sys
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Load configuration from config.py or environment variables
def load_config():
    # Try to load from config.py first
    try:
        import config
        return {
            'API_BASE_URL': config.API_BASE_URL,
            'API_KEY': config.API_KEY,
            'CACHE_DURATION_MINUTES': getattr(config, 'CACHE_DURATION_MINUTES', 30),
            'DEBUG': getattr(config, 'DEBUG', True),
            'HOST': getattr(config, 'HOST', '0.0.0.0'),
            'PORT': getattr(config, 'PORT', 5000)
        }
    except ImportError:
        # Fall back to environment variables
        api_key = os.getenv('HYPRLAB_API_KEY')
        if not api_key:
            print("❌ Configuration not found!")
            print("📋 Option 1: Copy 'config.example.py' to 'config.py' and update with your API key")
            print("📋 Option 2: Copy '.env.example' to '.env' and update with your API key")
            print("📋 Option 3: Set environment variable HYPRLAB_API_KEY")
            print("💡 Example: cp config.example.py config.py")
            sys.exit(1)
        
        return {
            'API_BASE_URL': os.getenv('HYPRLAB_API_BASE_URL', 'https://api.hyprlab.io/v1'),
            'API_KEY': api_key,
            'CACHE_DURATION_MINUTES': int(os.getenv('CACHE_DURATION_MINUTES', '30')),
            'DEBUG': os.getenv('DEBUG', 'True').lower() == 'true',
            'HOST': os.getenv('HOST', '0.0.0.0'),
            'PORT': int(os.getenv('PORT', '5000'))
        }

# Load configuration
config_data = load_config()
API_BASE_URL = config_data['API_BASE_URL']
API_KEY = config_data['API_KEY']
CACHE_DURATION = timedelta(minutes=config_data['CACHE_DURATION_MINUTES'])
DEBUG = config_data['DEBUG']
HOST = config_data['HOST']
PORT = config_data['PORT']

# Validate required configuration
if not API_KEY or API_KEY == "your-api-key-here":
    print("❌ API_KEY not configured properly!")
    print("📝 Please set your actual HyprLab API key in config.py or environment variables.")
    sys.exit(1)

# Cache configuration
CACHE_DIR = "cache"

def get_headers():
    return {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

def ensure_cache_dir():
    if not os.path.exists(CACHE_DIR):
        os.makedirs(CACHE_DIR)

def get_cache_file_path(endpoint):
    return os.path.join(CACHE_DIR, f"{endpoint}.json")

def is_cache_valid(cache_file):
    if not os.path.exists(cache_file):
        return False
    
    file_time = datetime.fromtimestamp(os.path.getmtime(cache_file))
    return datetime.now() - file_time < CACHE_DURATION

def load_from_cache(endpoint):
    cache_file = get_cache_file_path(endpoint)
    if is_cache_valid(cache_file):
        with open(cache_file, 'r') as f:
            return json.load(f)
    return None

def save_to_cache(endpoint, data):
    ensure_cache_dir()
    cache_file = get_cache_file_path(endpoint)
    with open(cache_file, 'w') as f:
        json.dump(data, f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/info')
def get_user_info():
    force_refresh = request.args.get('refresh', 'false').lower() == 'true'
    
    if not force_refresh:
        cached_data = load_from_cache('info')
        if cached_data:
            return jsonify(cached_data)
    
    try:
        response = requests.get(f"{API_BASE_URL}/info", headers=get_headers())
        response.raise_for_status()
        data = response.json()
        save_to_cache('info', data)
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/usage')
def get_usage_data():
    force_refresh = request.args.get('refresh', 'false').lower() == 'true'
    
    if not force_refresh:
        cached_data = load_from_cache('usage')
        if cached_data:
            return jsonify(cached_data)
    
    try:
        response = requests.get(f"{API_BASE_URL}/usage", headers=get_headers())
        response.raise_for_status()
        data = response.json()
        save_to_cache('usage', data)
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/cache/status')
def get_cache_status():
    ensure_cache_dir()
    status = {}
    for endpoint in ['info', 'usage']:
        cache_file = get_cache_file_path(endpoint)
        if os.path.exists(cache_file):
            file_time = datetime.fromtimestamp(os.path.getmtime(cache_file))
            status[endpoint] = {
                'cached': True,
                'last_updated': file_time.isoformat(),
                'is_valid': is_cache_valid(cache_file)
            }
        else:
            status[endpoint] = {'cached': False}
    return jsonify(status)

if __name__ == '__main__':
    print("🚀 Starting HyprLab Usage Dashboard...")
    print(f"📡 API Base URL: {API_BASE_URL}")
    print(f"🔑 API Key: {'*' * (len(API_KEY) - 8) + API_KEY[-8:] if len(API_KEY) > 8 else '***'}")
    print(f"⏰ Cache Duration: {CACHE_DURATION}")
    print(f"🌐 Server: http://{HOST}:{PORT}")
    print("=" * 50)
    
    app.run(debug=DEBUG, host=HOST, port=PORT)