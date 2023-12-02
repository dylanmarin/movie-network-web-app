import MovieDetailsReview from "../Movies/MovieDetailsReview";
import {useSelector} from "react-redux";


const ReviewsByPeopleFollowing = ({movieId}) => {
    const signedIn = useSelector((state) => state.usersReducer.signedIn);

    const reviews = [];

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
