import "./index.css"
import {useEffect, useState} from "react";
import db from "../Database"
import {Link} from "react-router-dom";
import StarRating from "../StarRating";

const MovieReviewStub = ({review}) => {
    const {_id, rating, reviewText, movieTitle, posterURL} = review;

    const POSTER_URL = "https://image.tmdb.org/t/p/w500";

    return (
        <div className={"movie-stub text-center"}>
            <Link to={`/reviews/${_id}`} className={"m-auto"}>
                <h4>{movieTitle}</h4>
                <img src={`${POSTER_URL}/${posterURL}`} alt={"poster"} className={"movie-stub-image"}/>
            </Link>
            <div className={"star-rating"}>
                <StarRating rating={rating}/>
            </div>
            <p className={"mb-0"}>{reviewText}</p>
        </div>
    )
}


export default MovieReviewStub
