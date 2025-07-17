import "./DiaryList.css"
import Button from "./Button"
import DiaryItem from "./DiaryItem"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const DiaryList = ({data}) => {
    const [sortType, setSortType] = useState("latest")

    const onCahngeSortType = (e) => {
        setSortType(e.target.value)
    }

    const getSortedData = () => {
        return data.toSorted((a, b) => {
            if (sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate)
            } else {
                return Number(b.createdDate) - Number(a.createdDate)
            }
        })
    }

    const sortedData = getSortedData()

    const nav = useNavigate()

    const goNewPage = () => {
        nav("/new")
    }

    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select value={sortType} onChange={onCahngeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button text={"새 일기 쓰기"} type={"POSITIVE"} onClick={goNewPage}/>
            </div>
            <div className="list_wrapper">
                {sortedData.map((item) => (<DiaryItem key = {item.id} {...item} />))}
            </div>
        </div>
    )
}

export default DiaryList