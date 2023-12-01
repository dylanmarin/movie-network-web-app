import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as client from "../Movies/client";
import DetailsSidebar from "../Movies/DetailsSidebar";
import "./index.css"
import db from "../Database";
import {Link, useNavigate} from "react-router-dom";
import StarRating from "../StarRating";

const Reviews = ({edit}) => {
    const {reviewId} = useParams();
    const [review, setReview] = useState({});
    const [editedReview, setEditedReview] = useState({});
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
        setEditedReview(review)
        navigate(`/reviews/${reviewId}`)
    }

    const handleCancel = () => {
        setReview(editedReview)
        navigate(`/reviews/${reviewId}`)
    }

    useEffect(() => {
        const review = db.reviews.find((review) => review._id === parseInt(reviewId));
        setReview(review);
        setEditedReview(review);

        const user = db.users.find((user) => user._id === review.userId);
        setUser(user);

        if (review) {
            fetchMovieById(review.movieId);
        }


    }, [reviewId]);


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
                                <p className={"m-0 fs-5"}>
                                    <Link to={`/users/${user._id}`} className={"fw-bold"}>{user.username}</Link> reviewed
                                </p>
                                <Link to={`/movies/${movie.id}`}>
                                    <h1 className={"d-inline"}>{title}</h1>
                                    <p className={"d-inline ms-2"}>{release_year}

                                    </p>
                                </Link>
                            </div>
                            <div className={"fs-2 mb-2"}>
                                <StarRating rating={review.rating}/>
                                {
                                    edit &&
                                    <div>
                                        <input type={"range"} className={"form-range"} min={1} max={5} step={1}
                                               value={review.rating} onChange={(e) => {
                                            setReview({...review, rating: e.target.value})
                                        }}/>
                                    </div>

                                }
                            </div>

                            <div className={""}>
                                {
                                    !edit &&
                                    <p className={"m-0"}>{review.reviewText}</p>
                                }
                                {
                                    edit &&
                                    <textarea className={"form-control"} rows={3}
                                              value={review.reviewText}
                                              onChange={(e) => {
                                                  setReview({...review, reviewText: e.target.value})
                                              }}/>
                                }
                            </div>


                        </div>
                    </div>
                </div>


                <div className={"col-4"}>
                    <DetailsSidebar movie={movie} edit={edit} handleCancel={handleCancel} handleSave={handleSave}/>
                </div>

            </div>
        </div>

    )
}

export default Reviews;
