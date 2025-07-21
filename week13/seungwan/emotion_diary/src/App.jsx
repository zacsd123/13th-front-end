import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";
import Button from "./components/Button";
import Header from "./components/Header";
import axios from "./axios/axios"

import { getEmotionImage } from "./util/get-emotion-image";

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;

    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  // localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [pivotDate, setPivotDate] = useState(new Date());

  // 서버에서 월별 데이터 가져오기
  const onLoad = async () => {
    let data = []
    try {
      const res = await axios.get(`/diaries?month=${pivotDate.getFullYear()}-`+String(pivotDate.getMonth()+1).padStart(2, "0"))
      data = res.data
    } catch (error) {
      console.log("error")
    }
    return data
  }

  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);

  // console.log(data, "App")
  const idRef = useRef(0);

  useEffect(() => {
    const loadingData = async () => {
      try {
        const res = await axios.get(`/diaries?month=${pivotDate.getFullYear()}-`+String(pivotDate.getMonth()+1).padStart(2, "0"))
        const fetchedData = res.data

        if (!Array.isArray(fetchedData)) {
          console.log("error")
        }

        let maxId = 0;
        fetchedData.forEach((item) => {
          if (Number(item.id) > maxId) {
            maxId = Number(item.id);
          }
        });

        idRef.current = maxId + 1;

        dispatch({
          type: "INIT",
          data: fetchedData,
        });

        // console.log("fatched")
      } catch (error) {
        console.log("error", error)
      } finally {
        setIsLoading(false)
      }

    } 
    loadingData()
  }, []);

  // 새로운 일기 추가
  const onCreate = async (createdDate, emotionId, content) => {
    try {
      const res = await axios.post("/diaries", {
        createdDate,
        emotionId,
        content
      })

      const newDiary = res.data
      dispatch({
        type: "CREATE",
        data: newDiary,
      });
    } catch (error) {
      console.log("failed")
    }

  };

  // 기존 일기 수정
  const onUpdate = async (id, createdDate, emotionId, content) => {
    try {
      const res = await axios.put(`/diaries/${id}`, {
        createdDate,
        emotionId,
        content
      })

      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
    
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = async (id) => {
    try {
      const res = await axios.delete(`/diaries/${id}`)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다 ...</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={{data, pivotDate}}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete, setPivotDate, onLoad }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
