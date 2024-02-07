import { Container, SearchBox } from ".."
// import { useAudioContext } from "../../Context/AudioContext"
import VideoData from "../../Utility/Data.json"
import style from "./style.module.scss"

export default function ContainWrapper() {
    // const audio = useAudioContext()
    return (
        <div className={style.container}>
            <SearchBox placeholder="Search for the Music" />
            <div className={style.separator} />
            <section className={style.mainContainer}>
                <Container
                    data={VideoData}
                    title="Discover"
                    subtitle="Discover new music to your liking"
                    // onPress={(video_id) => {
                    // }}
                />

                <Container
                    data={VideoData}
                    subtitle="Find new music that you may like"
                    title="Suggestion"
                />

                <Container
                    data={VideoData}
                    subtitle="Find new music that you may like"
                    title="Suggestion"
                />
            </section>
        </div>
    )
}
