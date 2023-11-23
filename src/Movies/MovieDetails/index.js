import {useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../../Database"
import "./index.css"
import MovieDetailsReview from "./MovieDetailsReview";

const MovieDetails = () => {
    const {movieId} = useParams();
    const [movie, setMovie] = useState({});
    const [reviews, setReviews] = useState([]);

    const IMAGE_URL_BASE = "https://image.tmdb.org/t/p/";
    const IMAGE_SIZE = "w500";

    useEffect(() => {
        const movie = db.movies.find((movie) => movie.id === parseInt(movieId))
        setMovie(movie);

        const reviews = db.reviews.filter((review) => review.movieId === parseInt(movieId))
        setReviews(reviews);
    }, [movieId]);

    const {title, overview, poster_path, release_date} = movie;

    return (
        <div className={"movie-details"}>
            <div className={"row"}>
                <div className={"col"}>
                    <h1>{title}</h1>
                    <div className={"row"}>
                        <div className={"col-4"}>
                            <img src={`${IMAGE_URL_BASE}${IMAGE_SIZE}${poster_path}`} alt={"poster"}
                                 className={"movie-poster"}/>
                        </div>
                        <div className={"col mt-2"}>
                            <h5>Synopsis:</h5>
                            <p className={"mt-0"}>{overview}</p>
                        </div>
                    </div>
                </div>
                <div className={"col-4"}>
                    <h2>Following:</h2>
                    Users who you follow that have watched this movie:
                    <div className={"list-group"}>
                        {reviews.map((review) =>
                            <MovieDetailsReview review={review}/>
                        )}
                    </div>
                </div>
            </div>

            <h5 className={"mt-2"}>Movie Details:</h5>
            <p>Release Date: {release_date}</p>

        </div>
    );

}


export default MovieDetails;
