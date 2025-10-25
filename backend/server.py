from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='../frontend')

@app.route('/')
def serve_index():
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('../frontend', path)

# Import and use your existing app routes
from app import *

if __name__ == '__main__':
    app.run(debug=True, port=8080)