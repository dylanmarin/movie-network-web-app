import MovieDetailsReview from "../Movies/MovieDetailsReview";
import {useSelector} from "react-redux";
import * as reviewsClient from "./client";
import {useEffect, useState} from "react";
import * as followsClient from "../Followers/client";

const ReviewsByPeopleFollowing = ({movieId}) => {
    const signedIn = useSelector((state) => state.usersReducer.signedIn);
    const loggedInUser = useSelector((state) => state.usersReducer.loggedInUser);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async (movieId) => {

            if (signedIn) {
                const follows = await followsClient.findFollowedUsersByUser(loggedInUser._id);
                const usersWeFollow = follows.map((follow) => follow.followed);
                const userIdsWeFollow = usersWeFollow.map((user) => user._id);


                const reviews = await reviewsClient.findAllReviews();

                setReviews(reviews.filter((review) => review.movieId === parseInt(movieId)).filter((review) => userIdsWeFollow.includes(review.user._id)));
            }
        }


        if (movieId) {
            fetchReviews(movieId);
        }
    }, [movieId]);

    return (
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
    )
}

export default ReviewsByPeopleFollowing;
