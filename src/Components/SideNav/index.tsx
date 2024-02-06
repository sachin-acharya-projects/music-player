// import style from "./style.module.scss"
import { useRef } from "react"
import style from "./style.module.scss"

type SideNavProps = {
    username: string
    logoutPath?: string
}
export default function SideNav({ username, logoutPath }: SideNavProps) {
    const sidebarRef = useRef<HTMLDivElement>(null)
    function redirectLogout() {
        if (logoutPath) {
            window.location.href = logoutPath
        }
    }

    function drawerToggle() {
        // const sidebar: HTMLDivElement = document.querySelector(".sidebar")!
        const sidebar = sidebarRef.current!
        const attribute = sidebar.dataset.close ?? null
        if (attribute) sidebar.removeAttribute("data-close")
        else sidebar.setAttribute("data-close", "sidebar")
    }
    return (
        <div
            className={style.sidebar}
            ref={sidebarRef}
            data-close="sidebar"
        >
            <div className="logo-area" onClick={drawerToggle}>
                <div className="logo-container">
                    <img src="/music-player/generic_logo.ico" alt="Fantastic Music Player" />
                </div>
                <div className="logo-title">Music Player</div>
            </div>
            <div className="divider-line"></div>
            <ul className="menu-area">
                <li className="active">
                    <MenuButton icon="home" title="Home" />
                </li>
                <li>
                    <MenuButton icon="featured_play_list" title="Genre" />
                </li>
                <li>
                    <MenuButton icon="person" title="Artist" />
                </li>
                <li>
                    <MenuButton icon="queue_music" title="Playlists" />
                </li>
                <li>
                    <MenuButton icon="notifications" title="Notifications" />
                </li>
                <li>
                    <MenuButton icon="settings" title="Settings" />
                </li>
            </ul>

            <div className="user-information">
                <p className="username">{username}</p>
                <p className="user-logout-button" onClick={redirectLogout}>
                    <span className="logout-text">Logout</span>
                    <span className="logout-icon material-icons" title="Logout">
                        logout
                    </span>
                </p>
            </div>
        </div>
    )
}

type MenuButtonProps = {
    icon: string
    title: string
}
function MenuButton({ icon, title }: MenuButtonProps) {
    return (
        <>
            <span className="menu-icon material-icons" title={title}>
                {icon}
            </span>
            <span className="menu-title">{title}</span>
        </>
    )
}
