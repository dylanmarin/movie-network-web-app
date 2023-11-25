import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as client from "../client";


const Reviews = () => {
    const {reviewId} = useParams();
    const [review, setReview] = useState({});
    const [movie, setMovie] = useState({});

    const fetchMovieById = async (movieId) => {
        const movie = await client.getMovieDetails(movieId)
        setMovie(movie)
    }

    useEffect(() => {
        const review = db.reviews.find((review) => review._id === reviewId);
        setReview(review);

        fetchMovieById(review.movieId);
    }, [reviewId]);


    return (

    )
}

export default Reviews;
