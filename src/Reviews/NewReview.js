import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as client from "../client";
import DetailsSidebar from "../Movies/MovieDetails/DetailsSidebar";
import "./index.css"
import db from "../Database";
import {Link, useNavigate} from "react-router-dom";
import StarRating from "../StarRating";

const NewReview = () => {
    const {movieId} = useParams();
    const [review, setReview] = useState({
        rating: 3,
        reviewText: ""
    });
    const [movie, setMovie] = useState({});
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const IMAGE_URL_BASE = "https://image.tmdb.org/t/p/w500/";

    const fetchMovieById = async (movieId) => {
        const movie = await client.getMovieDetails(movieId)
        setMovie(movie)
    }

    const handleSave = () => {
        // save review changes
        // save to db
        // get new id
        // navigate(`/reviews/${reviewId}`)
    }

    const handleCancel = () => {
        // go back to movie
        navigate(`/movies/${movie.id}`)
    }

    useEffect(() => {
        const user = db.users.find((user) => user._id === review.userId);
        setUser(user);

        fetchMovieById(movieId);
    }, [movieId]);


    const {title, poster_path, release_date} = movie;
    const release_year = release_date ? release_date.split("-")[0] : "";

    return (
        <div className={"movie-details"}>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"row"}>

                        <div className={"col-4"}>
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
                                <StarRating rating={review.rating}/>
                                <div>
                                    <input type={"range"} className={"form-range"} min={1} max={5} step={1}
                                           value={review.rating} onChange={(e) => {
                                        setReview({...review, rating: e.target.value})
                                    }}/>
                                </div>
                            </div>

                            <div className={""}>
                                    <textarea className={"form-control"} rows={3}
                                              value={review.reviewText}
                                              onChange={(e) => {
                                                  setReview({...review, reviewText: e.target.value})
                                              }}
                                              placeholder={"Write your review here"}
                                    />
                            </div>


                        </div>
                    </div>
                </div>


                <div className={"col-4"}>
                    <DetailsSidebar movie={movie} newReview={true} handleCancel={handleCancel} handleSave={handleSave}/>
                </div>

            </div>
        </div>

    )
}

export default NewReview;
