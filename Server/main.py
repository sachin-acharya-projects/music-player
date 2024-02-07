from flask import Flask, jsonify

app = Flask(
    __name__
)

# video information without playback url
@app.route("/api/video/<video_id>/no-url/")
def video_no_playback(video_id: str):
    return jsonify({
        "video_id": video_id,
        "no-url": True
    })
# video information with playback url
@app.route("/api/video/<video_id>/")
def video(video_id: str):
    return jsonify({
        "video_id": video_id,
        "no-url": False
    })

# video playback url
@app.route("/api/video/playback/<video_id>")
def video_playback(video_id):
    return jsonify({
        "video_id": video_id,
        "no-url": False
    })

# Playlist videos without playback url
@app.route("/api/playlist/<playlist_id>/no-url/")
def playlist_no_playback(playlist_id: str):
    return jsonify({
        "playlist_id": playlist_id,
        "no-url": True
    })
# Playlist videos with playback url
@app.route("/api/playlist/<playlist_id>/")
def playlist(playlist_id: str):
    return jsonify({
        "playlist_id": playlist_id,
        "no-url": False
    })

# Search Videos (From Title)
@app.route("/api/search/video/<video_title>/")
def search_video(video_title: str):
    return jsonify({
        "video_title": video_title,
        "no-url": False
    })
    

if __name__ == "__main__":
    app.run(debug=True)