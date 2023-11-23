import "./index.css"
import {useEffect, useState} from "react";
import db from "../Database"
import {Link} from "react-router-dom";
import StarRating from "../StarRating";

const MovieReviewStub = ({review}) => {
    const {rating, reviewText, movieId} = review;
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const movie = db.movies.find((movie) => movie.id === parseInt(movieId))
        setMovie(movie);
    }, [movieId]);

    const POSTER_URL = "https://image.tmdb.org/t/p/w500";
    const {poster_path, title} = movie;

    return (
        <div className={"movie-stub text-center"}>
            <Link to={`/movies/${movieId}`} className={"m-auto"}>
                <h4>{title}</h4>
                <img src={`${POSTER_URL}/${poster_path}`} alt={"poster"} className={"movie-stub-image"}/>
            </Link>
            <div className={"star-rating"}>
                <StarRating rating={rating}/>
            </div>
            <p className={"mb-0"}>{reviewText}</p>
        </div>
    )
}


export default MovieReviewStub
