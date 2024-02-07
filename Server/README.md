# Server - Music Player

It is an API for Music Player that scrapes Data from YouTube and return

## Endpoints

### Get video informations without playback url

1. **Endpoint:** `/api/video/<video-id>/no-url/` _[GET]_

### Get video informations with playback url

2. **Endpoint:** `/api/video/<video-id/` _[GET]_

---

### Get playlist videos informations without playback url

3. **Endpoint:** `/api/playlist/<playlist-id>/no-url/` _[GET]_

### Get playlist videos informations with playback url

4. **Endpoint:** `/api/playlist/<playlist-id>/` _[GET]_

---

### Search YouTube video

5. **Endpoint:** `/api/search/video/<video-title>/` _[POST]_

---

### Get playback URL

6. **Endpoint: ** `/api/video/playback/<video-id>/` **[GET]**



> (Note: For faster response, always use endpoint that returns without playback url as extracting playback url is slow process and thus decrease the API response time)\_
