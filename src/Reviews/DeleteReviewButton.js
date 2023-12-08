import {useNavigate} from "react-router-dom";
import * as reviewsClient from "./client";

const DeleteReviewButton = ({reviewId}) => {
    const navigate = useNavigate();
    const handleDeleteReview = async () => {
        const response = await reviewsClient.deleteReview(reviewId);

        if (response.deletedCount > 0) {
            navigate("/home");
        } else {
            alert("Something went wrong!")
            navigate(`/reviews/${reviewId}`)
        }
    }

    return (
        <button
            onClick={handleDeleteReview}
            className={"btn cin-btn-secondary sidebar-button"}>
            Delete Review
        </button>
    )
}

export default DeleteReviewButton;
