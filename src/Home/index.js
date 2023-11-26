import SearchBar from "../Search/SearchBar";
import PopularMovies from "../Shared/PopularMovies";
import ReviewLargeDisplayer from "../Reviews/ReviewLargeDisplayer";
import {useEffect, useState} from "react";
import db from "../Database";

const Home = () => {
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = db.users.find((user) => user._id === parseInt(1))
        setUser(user);

        const reviews = db.reviews.filter((review) => Object.keys(user.following).includes(review.userId.toString()))
        setReviews(reviews);

    }, []);

    return (
        <div>
            <SearchBar/>


            <PopularMovies timeRange={"week"}/>

            <h4>Reviews from people you follow</h4>
            <ReviewLargeDisplayer reviews={reviews}/>
        </div>
    );
}

export default Home;
