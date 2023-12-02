import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const AddReviewButton = ({movieId}) => {
    const signedIn = useSelector((state) => state.usersReducer.signedIn);

    const navigate = useNavigate();

    const handleReviewButton = () => {
        if (signedIn) {
            navigate(`/movies/${movieId}/review`)
        } else {
            navigate("/signin")
        }
    }

    return (<button
        onClick={handleReviewButton}
        className={"btn btn-secondary sidebar-button"}>
        {signedIn && "Add a Review"}
        {!signedIn && "Sign in to leave a Review!"}
    </button>)
}

export default AddReviewButton;
