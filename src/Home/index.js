import SearchBar from "../Search/SearchBar";
import PopularMovies from "../Shared/PopularMovies";
import ReviewLargeDisplayer from "../Reviews/ReviewLargeDisplayer";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import * as followsClient from "../Followers/client";
import * as reviewsClient from "../Reviews/client";


const Home = () => {
    const loggedInUser = useSelector((state) => state.usersReducer.loggedInUser);
    const signedIn = useSelector((state) => state.usersReducer.signedIn);
    const [reviews, setReviews] = useState([]);
    const [userIdsWeFollow, setUserIdsWeFollow] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            if (signedIn) {
                const follows = await followsClient.findFollowedUsersByUser(loggedInUser._id);
                const usersWeFollow = follows.map((follow) => follow.followed);
                const userIdsWeFollow = usersWeFollow.map((user) => user._id);
                setUserIdsWeFollow(userIdsWeFollow);

                const reviews = await reviewsClient.findAllReviews();
                reviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
                setReviews(reviews.filter((review) => userIdsWeFollow.includes(review.user._id)));
            }
        }
        fetchReviews();
    }, []);

    return (
        <div>
            <SearchBar/>

            <PopularMovies timeRange={"week"}/>

            {
                signedIn && userIdsWeFollow.length > 0 &&
                <>
                    <h4>Reviews from people you follow</h4>
                    <ReviewLargeDisplayer reviews={reviews}/>
                </>
            }
            {
                !signedIn &&
                <h4>Sign in to see reviews from people you follow!</h4>
            }
            {
                signedIn && userIdsWeFollow.length === 0 &&
                <h4>Follow some people to see their reviews here!</h4>
            }
        </div>
    );
}

export default Home;
