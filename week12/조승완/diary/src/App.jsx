import "./App.css"
import Home from "./pages/Home"
import New from "./pages/New"
import Diary from "./pages/Diary"
import Edit from "./pages/Edit"
import Notfound from "./pages/Notfound"
import { Route, Routes} from "react-router-dom"
import { createContext, useReducer, useRef, useActionData } from "react"

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-02-19").getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2025-02-18").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2025-06-07").getTime(),
    emotionId: 2,
    content: "3번 일기 내용",
  },
]

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state]

    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      )
      
    case "DELETE":
      return state.map((item) => {
        return String(item.id) !== String(action.data.id)
      }
      )
  }
  return state
}

export const DiaryStateContext = createContext()
export const DiaryDispatchConext = createContext()

function App() {

  const [data, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data:
      {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    })
  }

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    })
  }

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      data: {id}
    })
  }

  return (
    <>
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchConext.Provider value={{onCreate, onUpdate, onDelete}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </DiaryDispatchConext.Provider>
    </DiaryStateContext.Provider>
    </>
  )
}
export default App
