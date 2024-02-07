import { PropsWithChildren, createContext, useContext, useState } from "react"
// import { API_BASE } from "../../Utility/Constant"

type AudioPlayerEvent =
    | "durationchange"
    | "ended"
    | "error"
    | "loadeddata"
    | "loadstart"
    | "pause"
    | "play"
    | "playing"
    | "progress"
    | "ratechange"
    | "seeked"
    | "seeking"
    | "stalled"
    | "timeupdate"
    | "volumechange"
    | "waiting"

class AudioPlayer {
    private audioPlayer: HTMLAudioElement
    private isLooping: boolean
    constructor() {
        this.audioPlayer = new Audio()
        this.isLooping = false
        this.togglePlayback = this.togglePlayback.bind(this)
        this.toggleLoop = this.toggleLoop.bind(this)
    }
    get play() {
        return this.audioPlayer.play()
    }

    get pause() {
        return this.audioPlayer.pause()
    }
    get isPaused() {
        return this.audioPlayer.paused
    }

    togglePlayback() {
        if (this.audioPlayer.paused) this.audioPlayer.play()
        else this.audioPlayer.pause()
    }

    get stop() {
        this.pause
        this.audioPlayer.currentTime = 0
        return null
    }
    set load(src: string) {
        const isPaused = this.audioPlayer.paused
        this.audioPlayer.pause()
        this.audioPlayer.src = src
        if (!isPaused) this.play
    }

    // async loadSrc(video_id: string) {
    //     try {
    //     } catch(e) {
    //         console.error(e)
    //         return Promise<null>
    //     }
    // }

    set volume(vol: number) {
        if (vol >= 0 && vol <= 1) {
            this.audioPlayer.volume = vol
        }
    }
    get getVolume() {
        return this.audioPlayer.volume
    }

    set loop(state: boolean) {
        this.audioPlayer.loop = state
    }
    toggleLoop() {
        this.isLooping = !this.isLooping
        this.audioPlayer.loop = this.isLooping
    }
    get isAudioLooping() {
        return this.audioPlayer.loop
    }

    addListener(event: AudioPlayerEvent, listener: (event: Event) => void) {
        this.audioPlayer.addEventListener(event, listener)
    }
    removeListener(event: AudioPlayerEvent, listener: (event: Event) => void) {
        this.audioPlayer.removeEventListener(event, listener)
    }
}

class AudioState {
    private _video_id?: string
    private _thumbnail_url: string
    private _video_title: string
    private _channel: string
    private _duration: string

    private _setVideoTitle?: (title: string) => void
    private _setThumbnailUrl?: (thumbnail: string) => void
    private _setChannel?: (channel: string) => void
    private _setDuration?: (duration: string) => void
    private _setVideoID?: (id?: string) => void
    constructor(
        video_title: string,
        thumbnail_url: string,
        channel: string,
        duration: string,
        video_id?: string,
        setVideoTitle?: (title: string) => void,
        setThumbnailUrl?: (thumbnail: string) => void,
        setChannel?: (channel: string) => void,
        setDuration?: (duration: string) => void,
        setVideoID?: (video_id?: string) => void
    ) {
        this._video_id = video_id
        this._video_title = video_title
        this._thumbnail_url = thumbnail_url
        this._channel = channel
        this._duration = duration

        this._setVideoTitle = setVideoTitle
        this._setThumbnailUrl = setThumbnailUrl
        this._setChannel = setChannel
        this._setDuration = setDuration
        this._setVideoID = setVideoID
    }

    get title() {
        return this._video_title
    }
    set title(title: string) {
        this._setVideoTitle?.(title)
    }

    get channel() {
        return this._channel
    }
    set channel(channel: string) {
        this._setChannel?.(channel)
    }

    get duration() {
        return this._duration
    }
    set duration(duration: string) {
        this._setDuration?.(duration)
    }

    get thumbnail() {
        return this._thumbnail_url
    }
    set thumbnail(src: string) {
        this._setThumbnailUrl?.(src)
    }

    get video_id(): string | undefined {
        return this._video_id
    }
    set video_id(id: string) {
        this._setVideoID?.(id)
    }
}

type AudioContextProps = {
    audio: AudioState
    playback: AudioPlayer
}
const AudioContext = createContext<AudioContextProps>({
    audio: new AudioState("", "", "", "", undefined),
    playback: new AudioPlayer(),
})

export default function AudioContextProvider({ children }: PropsWithChildren) {
    const [title, setTitle] = useState("")
    const [channel, setChannel] = useState("")
    const [duration, setDuration] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [video_id, setVideoID] = useState<string | undefined>(undefined)
    return (
        <AudioContext.Provider
            value={{
                audio: new AudioState(
                    title,
                    thumbnail,
                    channel,
                    duration,
                    video_id,
                    setTitle,
                    setThumbnail,
                    setChannel,
                    setDuration,
                    setVideoID
                ),
                playback: new AudioPlayer(),
            }}
        >
            {children}
        </AudioContext.Provider>
    )
}
export function useAudioContext() {
    const audioContext = useContext(AudioContext)
    if (!audioContext)
        throw new Error(
            "useAudioContext hook can only be used inside 'AudioContextProvider' component"
        )
    return audioContext
}
