import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams()

  const currentData = useDiary(params.id)

  return <div>{params.id}번 일기 수정페이지</div>;
};

export default Edit;