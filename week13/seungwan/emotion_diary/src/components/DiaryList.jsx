import Button from "./Button"
import "./DiaryList.css"
import DiaryItem from './DiaryItem'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const DiaryList = ({data}) => {
    const nav = useNavigate();

    const [sortType, setSortType] = useState("latest");

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }
    
    const getSortedData = () => {
        return data.toSorted((a,b) => {
            if(sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate);
            }
        })
    }

    // 컴포넌트가 리렌더링 될 때마다 sortedData라는 이름의 변수에 getSortedData() 함수를 호출한 결과를 저장
    const sortedData = getSortedData();

    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된순</option>
                </select>
                <Button onClick={() => nav("/new")} text={"새 일기 쓰기"} type={"POSITIVE"}/>
            </div>
            <div className="list_wrapper">
                {sortedData.map((item) => <DiaryItem key={item.id} {...item}/>)}
            </div>
        </div>
    )
}

export default DiaryList;