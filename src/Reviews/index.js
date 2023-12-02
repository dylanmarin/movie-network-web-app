import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as moviesClient from "../Movies/client";
import DetailsSidebar from "../Movies/DetailsSidebar";
import "./index.css"
import {Link, useNavigate} from "react-router-dom";
import StarRating from "../StarRating";
import {useSelector} from "react-redux";
import * as reviewsClient from "./client";
import {findReviewById} from "./client";


const Reviews = ({editting}) => {
    const {reviewId} = useParams();
    const [review, setReview] = useState({});
    const navigate = useNavigate();

    const IMAGE_URL_BASE = "https://image.tmdb.org/t/p/w500/";
    const validReviewId = reviewId.length === 24;

    const handleSave = async () => {
        // save review changes
        const response = await reviewsClient.updateReview(review._id,
            {
                ...review,
                reviewText: review.reviewText,
                rating: review.rating
            });

        if (response.matchedCount > 0) {
            navigate(`/reviews/${review._id}`)
        } else {
            alert("Something went wrong!")
            navigate(`/reviews/${review._id}`)
        }
    }

    const handleCancel = () => {
        navigate(`/reviews/${reviewId}`)
    }


    useEffect(() => {
        const findReviewDetails = async (reviewId) => {
            const response = await reviewsClient.findReviewById(reviewId);

            setReview(response)
            if (!response) {
                navigate("/home");
            }
        }

        if (validReviewId) {
            findReviewDetails(reviewId);
        } else {
            navigate("/home");
        }
    }, [reviewId]);


    const {movieTitle, posterURL, releaseDate, user, movieId} = review;
    const release_year = releaseDate ? releaseDate.split("-")[0] : "";

    return (
        <div className={"movie-details"}>
            {review._id &&
                <div className={"row"}>
                    <div className={"col"}>
                        <div className={"row"}>

                            <div className={"col-4"}>
                                <Link to={`/movies/${movieId}`}>
                                    <img src={`${IMAGE_URL_BASE}${posterURL}`} alt={"poster"}
                                         className={"movie-poster"}/>
                                </Link>
                            </div>

                            <div className={"col"}>

                                <div className={"m-0"}>
                                    <p className={"m-0 fs-5"}>
                                        <Link to={`/users/${user._id}`}
                                              className={"fw-bold"}>{review.user.username}</Link> reviewed
                                    </p>
                                    <Link to={`/movies/${movieId}`}>
                                        <h1 className={"d-inline"}>{movieTitle}</h1>
                                        <p className={"d-inline ms-2"}>{release_year}

                                        </p>
                                    </Link>
                                </div>
                                <div className={"fs-2 mb-2"}>
                                    <StarRating rating={review.rating}/>
                                    {
                                        editting &&
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
                                        !editting &&
                                        <p className={"m-0"}>{review.reviewText}</p>
                                    }
                                    {
                                        editting &&
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
                        <DetailsSidebar editting={editting} handleCancel={handleCancel} handleSave={handleSave}/>
                    </div>

                </div>
            }
        </div>

    )
}

export default Reviews;
