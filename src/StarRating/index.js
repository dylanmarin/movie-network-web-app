import {FaStar} from "react-icons/fa";
import "./index.css"


const StarRating = ({rating}) => {
    const starFilledColor = "#1D1F20";
    const starEmptyColor = "#A7A7A7";

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
