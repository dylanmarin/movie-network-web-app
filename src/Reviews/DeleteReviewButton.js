import {useNavigate} from "react-router-dom";

const DeleteReviewButton = ({reviewId}) => {

    const navigate = useNavigate();
    const handleDeleteReview = () => {

    }


    return (
        <button
            onClick={handleDeleteReview}
            className={"btn btn-secondary sidebar-button"}>
            Delete Review
        </button>
    )
}

export default DeleteReviewButton;
