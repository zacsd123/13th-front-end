import { getEmotionImage } from "../util/get-emotion-image"
import "./EmotionItem.css"

const EmotionItem = ({emotionId, emotionName, isSelected, onClick}) => {

    

    return (
        <div className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ""}`} 
            onClick={onClick}>
            <img className="emotion_img" src={getEmotionImage(emotionId)} />
            <div className="emotion_Name">{emotionName}</div>
        </div>
    )
}

export default EmotionItem