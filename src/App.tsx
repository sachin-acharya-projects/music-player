import { SideNav, ContainWrapper, AudioController } from "./Components"
import AudioContextProvider from "./Context/AudioContext"
import style from "./style/App.module.scss"

export default function App() {
    return (
        <AudioContextProvider>
            <section className={style.container}>
                <SideNav username="Sachin Acharya" logoutPath="/logout" />
                <ContainWrapper />
                <AudioController />
            </section>
        </AudioContextProvider>
    )
}
