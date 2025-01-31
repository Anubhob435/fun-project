# app.py
from flask import Flask, render_template, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

# Store stories in memory (in a real app, you'd use a database)
stories = []

@app.route('/')
def index():
    return render_template('index.html', stories=stories)

@app.route('/add_story', methods=['POST'])
def add_story():
    data = request.json
    story = {
        'name': data.get('name'),
        'occupation': data.get('occupation'),
        'story': data.get('story'),
        'color': data.get('color'),
        'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    stories.append(story)
    return jsonify({"success": True, "story": story})

if __name__ == '__main__':
    app.run(debug=True)