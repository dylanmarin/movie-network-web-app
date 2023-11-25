import MovieDetailsReview from "./MovieDetailsReview";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import db from "../../Database";
import "./index.css";

const DetailsSidebar = ({movie, edit = false, newReview = false, handleSave = null, handleCancel = null}) => {
    const [signedIn, setSignedIn] = useState(true);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [allowedToEdit, setAllowedToEdit] = useState(false);
    const {reviewId} = useParams();
    const movieId = movie.id;

    useEffect(() => {
        // get signedIn

        // fetch reviews by people you follow
        const reviews = db.reviews.filter((review) => review.movieId === parseInt(movieId));
        setReviews(reviews);

        // check if this is being displayed on a review page
        // if so, check if the current user is the author of the review
        // if so, allow them to edit it
        if (reviewId) {
            setAllowedToEdit(true);
        }
    }, [movie]);

    const handleReviewButton = () => {
        if (signedIn) {
            navigate(`/movies/${movieId}/review`)
        } else {
            navigate("/signin")
        }
    }

    const handleEditButton = () => {
        navigate(`/reviews/${reviewId}/edit`)
    }

    return (
        <div className={'details-sidebar'}>
            {
                !newReview &&
                <button
                    onClick={handleReviewButton}
                    className={"btn btn-secondary sidebar-button"}>
                    {signedIn && "Add a Review"}
                    {!signedIn && "Sign in to leave a Review!"}
                </button>
            }

            {allowedToEdit && !edit &&
                <button
                    onClick={handleEditButton}
                    className={"btn btn-secondary sidebar-button"}>
                    Edit Review
                </button>
            }

            {(edit || newReview) &&
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


            <div className={"following-reviews-list"}>

                <h2>Following</h2>
                {signedIn &&
                    <>
                        <p className={"m-0"}>Users you follow who have seen this film</p>

                        <div className={"following-reviews-list-item"}>
                            {reviews.map((review) =>
                                <MovieDetailsReview key={review._id} review={review}/>
                            )}
                        </div>
                    </>
                }

                {!signedIn &&
                    <>
                        <p className={"m-0"}>Sign in to see reviews by people you follow!</p>
                    </>
                }
            </div>
        </div>
    );
}

export default DetailsSidebar;
