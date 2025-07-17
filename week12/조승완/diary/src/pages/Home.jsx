import Header from "../components/Header"
import Button from "../components/Button"
import DiaryList from "../components/DiaryList"
import { useContext, useState } from "react"
import { DiaryStateContext } from "../App"

const getMonthDate = (pivoDate, data) => {
  const beginTime = new Date(
    pivoDate.getFullYear(), 
    pivoDate.getMonth(),
    1,
    0,
    0,
    0).getTime()
  const endTime = new Date(
    pivoDate.getFullYear(),
    pivoDate.getMonth() + 1,
    0,
    23,
    59,
    59).getTime()

  console.log()
  
  for (let i = 0; i < Object.keys(data).length; i++) {
    console.log(beginTime <= data[i].createdDate && data[i].createdDate <= endTime)
    console.log(beginTime)
    console.log(data[i].createdDate)
    console.log(endTime)
    console.log('-----------------')
  }

  return data.filter((item) => (beginTime <= item.createdDate && item.createdDate <= endTime))
}

const Home = () => {
  
  const [pivoDate, setPivoDate] = useState(new Date())
  const data = useContext(DiaryStateContext)

  const monthlyDate = getMonthDate(pivoDate, data)
  // console.log(monthlyDate)

  const onIncreaseMonth = () => {
    setPivoDate(
      new Date(pivoDate.getFullYear(), pivoDate.getMonth() + 1)
    )
  }
  const onDecreaseMonth = () => {
    setPivoDate(
      new Date(pivoDate.getFullYear(), pivoDate.getMonth() - 1)
    )
  }


  return(
    <div>
      <Header
        title = {`${pivoDate.getFullYear()}년 ${pivoDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <DiaryList data = {monthlyDate}/>
    </div>
  )
};

export default Home;