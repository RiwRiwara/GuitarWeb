# app.py
from flask import Flask, render_template,  request, jsonify, redirect
from flask_socketio import SocketIO
from resource.songs_data import songs
import os

app = Flask(__name__)
socketio = SocketIO(app)

def static_file_exists(filename):
    filepath = os.path.join(app.static_folder, filename)
    return os.path.exists(filepath)
app.jinja_env.globals['static_file_exists'] = static_file_exists

@app.route('/')
def index():
    return render_template('page/home.html')

@app.route('/detect')
def detect():
    song_title = request.args.get('song_title')
    if not song_title:
        alert_message = 'Please select a song'
        return redirect('/song?alert_message=' + alert_message)
    all_songs = songs['set1'] + songs['set2'] + songs['set3'] + songs['set4']
    try:
        selected_song = [song for song in all_songs if song['title'] == song_title][0]
    except :
        alert_message = 'Song not found'
        return redirect('/song?alert_message=' + alert_message)
    
    return render_template('page/detect_page.html', song=selected_song)

@app.route('/sound')
def sound():
    return render_template('page/sound.html')

@app.route('/song')
def song():
    difficult = request.args.get('difficult')
    genre = request.args.get('genre')
    name = request.args.get('name')
    alert_message = request.args.get('alert_message')
    
    return render_template('page/song.html', songs=songs, difficult=difficult, genre=genre, name=name, alert_message=alert_message)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    socketio.run(app, debug=True)