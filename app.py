from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

API_BASE_URL = os.getenv('HYPRLAB_API_BASE_URL', 'https://api.hyprlab.io/v1')
DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', '5000'))

def get_headers(api_key):
    return {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/api/info')
def get_user_info():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "API key is missing or invalid"}), 401
    
    api_key = auth_header.split(' ')[1]
    
    try:
        response = requests.get(f"{API_BASE_URL}/info", headers=get_headers(api_key))
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        if e.response is not None:
            return jsonify({"error": str(e)}), e.response.status_code
        else:
            return jsonify({"error": str(e)}), 500

@app.route('/api/usage')
def get_usage_data():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "API key is missing or invalid"}), 401

    api_key = auth_header.split(' ')[1]

    try:
        response = requests.get(f"{API_BASE_URL}/usage", headers=get_headers(api_key))
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        if e.response is not None:
            return jsonify({"error": str(e)}), e.response.status_code
        else:
            return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting HyprLab Usage Dashboard...")
    print(f"📡 API Base URL: {API_BASE_URL}")
    print(f"🌐 Server: http://{HOST}:{PORT}")
    print("=" * 50)
    
    app.run(debug=DEBUG, host=HOST, port=PORT)