import {FaStar} from "react-icons/fa";


const StarRating = ({rating}) => {
    return (
        <>
            <FaStar color={rating >= 1 ? "yellow" : "grey"}/>
            <FaStar color={rating >= 2 ? "yellow" : "grey"}/>
            <FaStar color={rating >= 3 ? "yellow" : "grey"}/>
            <FaStar color={rating >= 4 ? "yellow" : "grey"}/>
            <FaStar color={rating >= 5 ? "yellow" : "grey"}/>
        </>
    )
}

export default StarRating;
