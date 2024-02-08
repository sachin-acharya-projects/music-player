from flask import Flask, jsonify, request
from flask_caching import Cache
from youtubesearchpython import (
    Video,
    Playlist,
    VideosSearch,
)
from pytube import YouTube

app = Flask(__name__)
app.config["CACHE_TYPE"] = "simple"
cache = Cache(app)

video_url = "https://www.youtube.com/watch?v=%s"
playlist_url = "https://www.youtube.com/playlist?list=%s"


def maxThumbnail(thumbnails: list[dict]):
    return max(thumbnails, key=lambda x: x["width"])["url"]


def convert_seconds(seconds: int | float):
    hours = seconds // (3600)
    remainder = seconds % 3600
    minutes = remainder // 60
    remainder = remainder % 60

    if hours > 0:
        # return f"{hours:02d}:{minutes:02d}:{remainder:02d}"
        return f"{hours}:{minutes}:{remainder}"
    else:
        # return f"{minutes:02d}:{remainder:02d}"
        return f"{minutes}:{remainder}"


def parseVideoInformation(obj: dict, isPlaylist: bool = False):
    return {
        "title": obj["title"],
        "thumbnail": maxThumbnail(obj["thumbnails"]),
        "channel": obj["channel"]["name"],
        "duration": (
            obj["duration"]
            if isPlaylist
            else convert_seconds(int(obj["duration"]["secondsText"]))
        ),
        "video_id": obj["id"],
    }


# video information without playback url
@app.route("/api/video/no-url/", methods=["POST"])
def video_no_playback():
    if request.method == "POST":
        src = request.form.get("src", None)
        isID = bool(request.form.get("id", False))
        if not src:
            return (
                jsonify(
                    {
                        "status": "Invalid Request",
                        "message": "Argument 'src' is required. It can be Video URL or Video ID",
                    }
                ),
                400,
            )
        if isID:
            src = video_url % src
        video_info = Video.getInfo(src)
        return jsonify({"status": "success", **parseVideoInformation(video_info)}), 200
    return (
        jsonify(
            {"status": "Invalid Request", "message": "Only POST request is allowed"}
        ),
        405,
    )


# video information with playback url
@app.route("/api/video/", methods=["POST"])
@cache.cached(timeout=300)  # For 5 minutes
def video():
    if request.method == "POST":
        src = request.form.get("src", None)
        isID = bool(request.form.get("id", False))
        if not src:
            return (
                jsonify(
                    {
                        "status": "Invalid Request",
                        "message": "Argument 'src' is required. It can be Video URL or Video ID",
                    }
                ),
                400,
            )
        if isID:
            src = video_url % src
        video_src = YouTube(src).streams.get_audio_only()
        video_info = Video.getInfo(src)
        return (
            jsonify(
                {
                    "status": "success",
                    **parseVideoInformation(video_info),
                    "stream": {
                        "url": video_src.url,
                        "expiration": video_src.expiration,
                    },
                }
            ),
            200,
        )
    return (
        jsonify(
            {"status": "Invalid Request", "message": "Only POST request is allowed"}
        ),
        405,
    )


# video stream url
@app.route("/api/video/stream/", methods=["POST"])
@cache.cached(timeout=300)
def video_playback():
    if request.method == "POST":
        src = request.form.get("src", None)
        isID = bool(request.form.get("id", False))

        if not src:
            return (
                jsonify(
                    {
                        "status": "Invalid Request",
                        "message": "Argument 'src' is required. It can be Video URL or Video ID",
                    }
                ),
                400,
            )
        if isID:
            src = video_url % src
        video_src = YouTube(src).streams.get_audio_only()
        return jsonify(
            {
                "status": "success",
                "stream": {"url": video_src.url, "expiration": video_src.expiration},
            }
        )
    return (
        jsonify(
            {"status": "Invalid Request", "message": "Only POST request is allowed"}
        ),
        405,
    )


# Playlist videos without playback url
@app.route("/api/playlist/no-url/", methods=["POST"])
def playlist_no_playback():
    if request.method == "POST":
        src = request.form.get("src", None)
        isID = bool(request.form.get("id", False))
        if not src:
            return (
                jsonify(
                    {
                        "status": "Invalid Request",
                        "message": "Argument 'src' is required. It can be Video URL or Video ID",
                    }
                ),
                400,
            )
        if isID:
            src = playlist_url % src
        playlist_info = Playlist(src)
        while playlist_info.hasMoreVideos:
            playlist_info.getNextVideos()
        video_info = list(
            map(lambda x: parseVideoInformation(x, True), playlist_info.videos)
        )
        return jsonify({"status": "success", "videos": video_info}), 200
    return (
        jsonify(
            {"status": "Invalid Request", "message": "Only POST request is allowed"}
        ),
        405,
    )


# Search Videos (From Title)
@app.route("/api/search/video/", methods=["POST"])
def search_video():
    if request.method == "POST":
        src = request.form.get("src", None)
        limit = request.form.get("limit", "5")
        if not src:
            return (
                jsonify(
                    {
                        "status": "Invalid Request",
                        "message": "Argument 'src' is required. It can be Video URL or Video ID",
                    }
                ),
                400,
            )
        if not limit.isdigit():
            return (
                jsonify(
                    {
                        "status": "Invalid Request",
                        "message": "Argument 'limit' must be digit",
                    }
                ),
                400,
            )
        video_info = VideosSearch(src, limit=int(limit)).result()
        print(video_info)
        video_info = list(
            map(lambda x: parseVideoInformation(x, True), video_info["result"])
        )
        return jsonify({"status": "success", "videos": video_info}), 200
    return (
        jsonify(
            {"status": "Invalid Request", "message": "Only POST request is allowed"}
        ),
        405,
    )


if __name__ == "__main__":
    app.run(debug=True)
