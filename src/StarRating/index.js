import {FaStar} from "react-icons/fa";
import "./index.css"


const StarRating = ({rating}) => {
    const starFilledColor = "#276071";
    const starEmptyColor = "#D9D9D9";

    return (
        <>
                <FaStar className={`star-icon`} color={rating >= 1 ? starFilledColor : starEmptyColor}/>
                <FaStar className={`star-icon`} color={rating >= 2 ? starFilledColor : starEmptyColor}/>
                <FaStar className={`star-icon`} color={rating >= 3 ? starFilledColor : starEmptyColor}/>
                <FaStar className={`star-icon`} color={rating >= 4 ? starFilledColor : starEmptyColor}/>
                <FaStar className={`star-icon`} color={rating >= 5 ? starFilledColor : starEmptyColor}/>
        </>
    )
}

export default StarRating;
