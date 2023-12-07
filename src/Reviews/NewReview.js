import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as client from "../Movies/client";
import DetailsSidebar from "../Movies/DetailsSidebar";
import "./index.css"
import {Link, useNavigate} from "react-router-dom";
import StarRating from "../StarRating";
import {useSelector} from "react-redux";
import * as reviewsClient from "./client";

const NewReview = () => {
    const {movieId} = useParams();
    const loggedInUser = useSelector((state) => state.usersReducer.loggedInUser);

    const [rating, setRating] = useState(3);
    const [reviewText, setReviewText] = useState("");

    const [movie, setMovie] = useState({});
    const navigate = useNavigate();

    const IMAGE_URL_BASE = "https://image.tmdb.org/t/p/w500/";

    const fetchMovieById = async (movieId) => {
        const movie = await client.getMovieDetails(movieId)
        setMovie(movie)
    }

    const handleSave = async () => {
        // save review changes
        const response = await reviewsClient.createReview({
            user: loggedInUser._id,
            movieId: movie.id,
            movieTitle: movie.title,
            posterURL: movie.poster_path,
            movieReleaseDate: movie.release_date,
            reviewText: reviewText,
            rating: rating,
            reviewDate: new Date().getTime()
        });


        if (response._id) {
            navigate(`/reviews/${response._id}`)
        } else {
            alert("Something went wrong!")
            navigate(`/movies/${movie.id}`)
        }
    }

    const handleCancel = () => {
        // go back to movie
        navigate(`/movies/${movie.id}`)
    }

    useEffect(() => {
        fetchMovieById(movieId);
    }, [movieId]);


    const {title, poster_path, release_date} = movie;
    const release_year = release_date ? release_date.split("-")[0] : "";

    return (
        <div className={"movie-details"}>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"row"}>

                        <div className={"col-4 d-none d-md-block poster-container"}>
                            <Link to={`/movies/${movie.id}`}>
                                <img src={`${IMAGE_URL_BASE}${poster_path}`} alt={"poster"}
                                     className={"movie-poster"}/>
                            </Link>
                        </div>

                        <div className={"col"}>

                            <div className={"m-0"}>

                                <h3>Leave A Review!</h3>

                                <Link to={`/movies/${movie.id}`}>
                                    <h1 className={"d-inline"}>{title}</h1>
                                    <p className={"d-inline ms-2"}>{release_year}

                                    </p>
                                </Link>
                            </div>
                            <div className={"fs-2 mb-2"}>
                                <StarRating rating={rating}/>
                                <div>
                                    <input type={"range"} className={"form-range"} min={1} max={5} step={1}
                                           value={rating} onChange={(e) => {
                                        setRating(parseInt(e.target.value))
                                    }}/>
                                </div>
                            </div>

                            <div className={"mb-3"}>
                                    <textarea className={"form-control"} rows={3}
                                              value={reviewText}
                                              onChange={(e) => {
                                                  setReviewText(e.target.value)
                                              }}
                                              placeholder={"Write your review here"}
                                    />
                            </div>


                        </div>
                    </div>
                </div>


                <div className={"col-md-4"}>
                    <DetailsSidebar movie={movie} newReview={true} handleCancel={handleCancel} handleSave={handleSave}/>
                </div>

            </div>
        </div>

    )
}

export default NewReview;
