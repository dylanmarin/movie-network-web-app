import MovieDetailsReview from "./MovieDetailsReview";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import db from "../Database";
import "./index.css";
import {useSelector} from "react-redux";
import ReviewsByPeopleFollowing from "../Reviews/ReviewsByPeopleFollowing";
import AddReviewButton from "../Reviews/AddReviewButton";
import EditReviewButton from "../Reviews/EditReviewButton";
import DeleteReviewButton from "../Reviews/DeleteReviewButton";
import * as reviewsClient from "../Reviews/client";

const DetailsSidebar = ({editting = false, newReview = false, handleSave = null, handleCancel = null}) => {
    const loggedInUser = useSelector((state) => state.usersReducer.loggedInUser);
    const navigate = useNavigate();
    const {reviewId} = useParams();
    const {movieId} = useParams();
    const [canEdit, setCanEdit] = useState(false);

    const [review, setReview] = useState({});



    useEffect(() => {

        const fetchReview = async () => {
            const response = await reviewsClient.findReviewById(reviewId);
            if (response) {
                const canEdit = loggedInUser._id === response.user._id || loggedInUser.role === "ADMIN" || loggedInUser.role === "MODERATOR" || newReview;

                if (editting && !canEdit) {
                    navigate(`/reviews/${reviewId}`);
                }

                setCanEdit(canEdit);

                setReview(response);
            }
        }

        if (reviewId) {
            if (reviewId.length === 24) {
                fetchReview();
            } else {
                navigate("/home");
            }
        }
    }, [movieId, reviewId]);

    return (
        <div className={'details-sidebar'}>
            {
                !newReview && !editting && <AddReviewButton movieId={review.movieId || movieId}/>
            }
            {
                canEdit && !editting &&
                <>
                    <EditReviewButton reviewId={reviewId}/>

                    <DeleteReviewButton reviewId={reviewId}/>
                </>
            }
            {
                (editting || newReview) &&
                <>
                    <button
                        onClick={handleSave}
                        className={"btn btn-secondary sidebar-button"}>
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className={"btn btn-secondary sidebar-button"}>
                        Cancel
                    </button>
                </>
            }

            <ReviewsByPeopleFollowing movieId={movieId}/>
        </div>
    );
}

export default DetailsSidebar;
