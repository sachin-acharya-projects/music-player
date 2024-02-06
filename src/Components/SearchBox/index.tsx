import { useRef } from "react"
import style from "./style.module.scss"

type SearchBoxProps = {
    placeholder: string
}
export default function SearchBox({ placeholder }: SearchBoxProps) {
    const searchButton = useRef<HTMLSpanElement>(null)
    return (
        <div className={style.searchBox}>
            <div className="input-area">
                <div
                    className="input-field"
                    contentEditable
                    //@ts-ignore
                    placeholder={placeholder}
                    spellCheck
                    data-gramm="false"
                    data-gramm-editor="false"
                    data-enable-grammarly="false"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            searchButton.current?.click()
                        }
                    }}
                />
                <span ref={searchButton} className="material-icons search-btn">
                    search
                </span>
            </div>
        </div>
    )
}
