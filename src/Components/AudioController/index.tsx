import style from "./style.module.scss"
import { useAudioContext } from "../../Context/AudioContext"

export default function index() {
    const audio = useAudioContext()

    return (
        <div
            className={`${style.container} ${
                audio.audio.video_id === undefined ? "hide" : "show"
            }`}
        >
            <div className="float-container">
                <div className="thumbnail-area">
                    <img src={audio.audio.thumbnail_url} alt="" />
                </div>
                <div className="control-information">
                    <div className="music-info">
                        <p className="title">{audio.audio.video_title}</p>
                        <p className="channel">
                            <span>{audio.audio.channel}</span>
                            <span>{audio.audio.duration}</span>
                        </p>
                    </div>
                    <div className="control-panel">
                        <IconButton icon="arrow_back" title="Previous" />
                        <IconButton
                            onPress={audio.playback.togglePlayback}
                            icon={
                                audio.playback.isPaused ? "play_arrow" : "pause"
                            }
                            title="Play"
                        />
                        <IconButton icon="arrow_forward" title="Next" />
                        <IconButton
                            onPress={audio.playback.toggleLoop}
                            icon="replay"
                            title="Loop"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

type IconButtonProps = {
    title: string
    icon: string
    onPress?: () => void
}
function IconButton({ title, icon, onPress }: IconButtonProps) {
    return (
        <>
            <button
                title={title}
                onClick={onPress}
                className={style.iconButton}
            >
                <span className="material-icons">{icon}</span>
            </button>
        </>
    )
}
