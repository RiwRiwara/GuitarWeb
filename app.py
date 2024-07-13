# app.py
from flask import Flask, render_template,  request, jsonify
from flask_socketio import SocketIO
from resource.songs_data import songs

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('page/home.html')

@app.route('/detect')
def detect():
    return render_template('page/detect_page.html')

@app.route('/song')
def song():
    difficult = request.args.get('difficult')
    genre = request.args.get('genre')
    name = request.args.get('name')
    
    return render_template('page/song.html', songs=songs, difficult=difficult, genre=genre, name=name)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')



if __name__ == '__main__':
    socketio.run(app, debug=True)