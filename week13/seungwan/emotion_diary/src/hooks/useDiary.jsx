import { useContext, useState, useEffect } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const { onLoad } = useContext(DiaryDispatchContext);
  const [curDiaryItem, setCurDiaryItem] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await onLoad(); // await로 실제 값 받기
        const currentDiaryItem = data.find(
          (item) => String(item.id) === String(id)
        );

        console.log("data: ", data, "\n cur: ", currentDiaryItem, "\nid: ", id);

        if (!currentDiaryItem) {
          window.alert("존재하지 않는 일기입니다.");
          nav("/", { replace: true });
        } else {
          console.log("changed");
          setCurDiaryItem(currentDiaryItem);
        }
      } catch (e) {
        console.log("데이터 로드 실패", e);
      }
    };

    fetchData();
  }, [id, onLoad]);

  console.log(`id: ${id}, curItem: `, curDiaryItem);
  return curDiaryItem;
};

export default useDiary;
