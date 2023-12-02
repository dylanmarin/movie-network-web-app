import {useNavigate} from "react-router-dom";

const EditReviewButton = ({reviewId}) => {

    const navigate = useNavigate();
    const handleEditButton = () => {
        navigate(`/reviews/${reviewId}/edit`)
    }

    return (
        <button
            onClick={handleEditButton}
            className={"btn btn-secondary sidebar-button"}>
            Edit Review
        </button>
    )
}

export default EditReviewButton;
