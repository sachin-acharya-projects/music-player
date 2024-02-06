import { memo, useState } from "react"
import style from "./style.module.scss"
import { useAudioContext } from "../../Context/AudioContext"

const PAGINATION_COUNT: number = 2

type DataDisplayProps = {
    video_id: string
    thumbnail_url: string
    video_title: string
    channel: string
    duration: string
}
type ContainerProps = {
    title: string
    subtitle: string
    data: DataDisplayProps[]
    onPress?: (video_id: string) => void
}
export default function index({
    title,
    subtitle,
    data,
    onPress,
}: ContainerProps) {
    const [dataCount, setDataCount] = useState(PAGINATION_COUNT)
    const audio = useAudioContext()

    return (
        <div className={style.itemContainer}>
            <div className="title-area">
                <p>{title}</p>
                <span>{subtitle}</span>
            </div>
            <div className="items-area">
                {data.slice(0, dataCount).map((item, index) => {
                    return (
                        <DataDisplay
                            onPress={onPress}
                            index={`${title}-${index}`}
                            key={`${title}-${index}`}
                            {...item}
                            title={`Play ${item.video_title}`}
                            isActive={audio.audio.video_id === item.video_id}
                        />
                    )
                })}

                <div className={style.viewMoreButton}>
                    <button
                        onClick={(e) => {
                            setDataCount(
                                (dataCount) => dataCount + PAGINATION_COUNT
                            )
                            const target = e.currentTarget.parentElement
                                ?.previousSibling as HTMLElement
                            target.scrollIntoView({
                                block: "start",
                                inline: "nearest",
                                behavior: "smooth",
                            })
                        }}
                        className={dataCount < data.length ? "" : "hide"}
                    >
                        View More
                    </button>
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

type AdditionalProps = {
    index: number | string
    isActive?: boolean
    title: string
    onPress?: (video_id: string) => void
}

const DataDisplay = memo(
    ({
        video_id,
        video_title,
        channel,
        duration,
        thumbnail_url,
        index,
        isActive,
        title,
        onPress,
    }: DataDisplayProps & AdditionalProps) => {
        // console.log(video_title)
        return (
            <div
                className={`item ${isActive ? "active" : "inactive"}`}
                key={`item-${index}`}
                data-videoid={video_id}
                data-index={index}
                onClick={() => onPress?.(video_id)}
                title={title}
            >
                <div className="thumbnail-area">
                    <img src={thumbnail_url} alt={video_title} loading="lazy" />
                </div>
                <div className="video-introduction">
                    <h3 className="video-title">{video_title}</h3>
                    <p className="video-channel">
                        <span className="channel">{channel}</span>
                        <span className="video-duration">{duration}</span>
                    </p>
                </div>
                <div className="control-panel">
                    <IconButton
                        title="Play/Pause this music"
                        icon={isActive ? "pause" : "play_arrow"}
                    />
                    <IconButton
                        title="Add/remove this music to library"
                        icon="playlist_add"
                    />
                    <IconButton title="Add to Favorite" icon="favorite" />
                    <IconButton title="Download this music" icon="download" />
                    <span
                        title="View more options"
                        className="material-icons more-vert"
                    >
                        more_vert
                    </span>
                </div>
            </div>
        )
    }
)
