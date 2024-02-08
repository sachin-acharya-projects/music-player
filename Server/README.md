# Server - Music Player

It is an API for Music Player that scrapes Data from YouTube and return

## Endpoints

1. **Get audio informations without playback URL**

    - **ENDPOINT:**
        ```bash
        /api/video/no-url/
        ```
    - **METHODS:** `['POST']`
    - **REQUEST:**

        ```json
        {
            "src": "YouTube ID or YouTube URL of the video",
            "id": "true if src is ID otherwise false. Default is false"
        }
        ```

    - **RESPONSE:**

        ```json
        {
            "title": "Title of the Audio (YouTube Title)",
            "thumbnail": "URL of the YouTube thumbnail for the video",
            "channel": "YouTube channel name of this video",
            "duration": "Duration of the video: (hr?:min:sec)",
            "video_id": "YouTube ID of the video",
            "status": "success"
        }
        ```

        or

        ```json
        {
            "status": "Invalid Request",
            "message": "Message about the issue"
        }
        ```

2. **Get audio informations with playback URL**

    - **ENDPOINT:**
        ```bash
        /api/video/
        ```
    - **METHODS:** `['POST']`
    - **REQUEST:**

        ```json
        {
            "src": "YouTube ID or YouTube URL of the video",
            "id": "true if src is ID otherwise false. Default is false"
        }
        ```

    - **RESPONSE:**

        ```json
        {
            "title": "Title of the Audio (YouTube Title)",
            "thumbnail": "URL of the YouTube thumbnail for the video",
            "channel": "YouTube channel name of this video",
            "duration": "Duration of the video: (hr?:min:sec)",
            "video_id": "YouTube ID of the video",
            "status": "success",
            "stream": {
                "url": "Stream URL of the audio file",
                "expiration": "Video Expire time - proper formatted, Example: Thu, 08 Feb 2024 14:14:42 GMT"
            }
        }
        ```

        or

        ```json
        {
            "status": "Invalid Request",
            "message": "Message about the issue"
        }
        ```

3. **Get audio stream url**

    - **ENDPOINT:**
        ```bash
        /api/video/stream/
        ```
    - **METHODS:** `['POST']`
    - **REQUEST:**

        ```json
        {
            "src": "YouTube ID or YouTube URL of the video",
            "id": "true if src is ID otherwise false. Default is false"
        }
        ```

    - **RESPONSE:**

        ```json
        {
            "status": "success",
            "stream": {
                "url": "Stream URL of the audio file",
                "expiration": "Video Expire time - proper formatted, Example: Thu, 08 Feb 2024 14:14:42 GMT"
            }
        }
        ```

        or

        ```json
        {
            "status": "Invalid Request",
            "message": "Message about the issue"
        }
        ```

4. **Get playlist videos informations without playback URL**

    - **ENDPOINT:**
        ```bash
        /api/playlist/no-url/
        ```
    - **METHODS:** `['POST']`
    - **REQUEST:**

        ```json
        {
            "src": "YouTube ID or YouTube URL of the video",
            "id": "true if src is ID otherwise false. Default is false"
        }
        ```

    - **RESPONSE:**

        ```json
        {
            "status": "success",
            "videos": [
                {
                    "title": "Title of the Audio (YouTube Title)",
                    "thumbnail": "URL of the YouTube thumbnail for the video",
                    "channel": "YouTube channel name of this video",
                    "duration": "Duration of the video: (hr?:min:sec)",
                    "video_id": "YouTube ID of the video"
                },
                ...
            ]
        }
        ```

        or

        ```json
        {
            "status": "Invalid Request",
            "message": "Message about the issue"
        }
        ```

5. **Get playlist videos informations without playback URL**
   This method is not available as it is too tasking to get stream url for each videos especially for the playlist with large number of videos.

6. **Get list of YouTube Searches**

    - **ENDPOINT:**
        ```bash
        /api/search/video/
        ```
    - **METHODS:** `['POST']`
    - **REQUEST:**

        ```json
        {
            "src": "Search string to search on YouTube",
            "limit": "Number of result required. Default is 5"
        }
        ```

    - **RESPONSE:**

        ```json
        {
            "status": "success",
            "videos": {
                "title": "Title of the Audio (YouTube Title)",
                "thumbnail": "URL of the YouTube thumbnail for the video",

                "channel": "YouTube channel name of this video",
                "duration": "Duration of the video: (hr?:min:sec)",
                "video_id": "YouTube ID of the video"
            }
        }
        ```

        or

        ```json
        {
            "status": "Invalid Request",
            "message": "Message about the issue"
        }
        ```
