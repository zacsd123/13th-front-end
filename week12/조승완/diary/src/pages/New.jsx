import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header"; 
import { useState } from "react";
import { useContext } from "react";
import { DiaryDispatchConext } from "../App"


const New = () => {
  const { onCreate } = useContext(DiaryDispatchConext)

  const onSubmit = (input) => {
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.content
    )
    nav("/", {replace: true})
  }

  const nav = useNavigate()

  return (
    <div>
      <Header 
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)}/>}/>
      <Editor onSubmit={onSubmit} />
    </div>
  )
};

export default New;