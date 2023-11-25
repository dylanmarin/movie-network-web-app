import MovieDetailsReview from "./MovieDetailsReview";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import db from "../../Database";
import "./index.css";

const DetailsSidebar = () => {
    const [signedIn, setSignedIn] = useState(true);
    const navigate = useNavigate();
    const {movieId} = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // get signedIn

        // fetch reviews by people you follow
        const reviews = db.reviews.filter((review) => review.movieId === parseInt(movieId));
        setReviews(reviews);
    }, []);

    const handleReviewButton = () => {
        if (signedIn) {
            navigate(`/movies/${movieId}/review`)
        } else {
            navigate("/signin")
        }
    }

    return (
        <div className={'details-sidebar'}>
            <button
                onClick={handleReviewButton}
                className={"btn btn-secondary review-button"}>
                {signedIn && "Add a Review"}
                {!signedIn && "Sign in to leave a Review!"}
            </button>


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
