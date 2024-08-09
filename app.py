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
@app.route('/test')
def test():
    return render_template('page/test.html')
@app.route('/chord-slide')
def chordslide():
    return render_template('page/chord-slide.html')

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

@app.route('/learn')
def learn():
    genre = request.args.get('genre')
    if genre is None:
        genre = ''  
    return render_template('page/learn.html', genre=genre)


@app.route('/course1')
def course1():
    return render_template('page/course1.html')

@app.route('/blog')
def blog():
    return render_template('page/blog.html')

@app.route('/blogcard')
def blogcard():
    return render_template('page/blog_card.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

# UPLOAD_FOLDER = "./uploads/chord_am/"
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)

# @app.route("/upload", methods=["POST"])
# def upload_file():
#     if "file" not in request.files:
#         return jsonify({"error": "No file part"}), 400

#     file = request.files["file"]
#     if file.filename == "":
#         return jsonify({"error": "No selected file"}), 400

#     file_path = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(file_path)
#     return jsonify({"filename": file.filename}), 200


if __name__ == '__main__':
    socketio.run(app, debug=True)