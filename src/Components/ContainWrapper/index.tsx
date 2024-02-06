import { Container, SearchBox } from ".."
import VideoData from "../../Utility/Data.json"
import style from "./style.module.scss"

export default function ContainWrapper() {
    return (
        <div className={style.container}>
            <SearchBox placeholder="Search for the Music" />
            <div className={style.separator} />
            <section className={style.mainContainer}>
                <Container
                    data={VideoData}
                    title="Discover"
                    subtitle="Discover new music to your liking"
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
