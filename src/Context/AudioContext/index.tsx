import { PropsWithChildren, createContext, useContext } from "react"

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

type AudioContextProps = {
    audio: {
        video_id?: string
        thumbnail_url: string
        video_title: string
        channel: string
        duration: string
    }
    playback: AudioPlayer
}
const defaultContext: AudioContextProps = {
    audio: {
        thumbnail_url: "",
        video_title: "",
        channel: "",
        duration: "",
    },
    playback: new AudioPlayer(),
}
const AudioContext = createContext<AudioContextProps>(defaultContext)

export default function AudioContextProvider({ children }: PropsWithChildren) {
    return (
        <AudioContext.Provider value={defaultContext}>
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
