import {useEffect, useState} from "react";
import * as client from "../../Movies/client";
import "./index.css"
import {Link} from "react-router-dom";
import StarRating from "../../StarRating";

const SingleReviewLarge = ({review}) => {
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    return (
        <>
            {review &&
                <div className={"p-2"}>

                    <Link to={`/reviews/${review._id}`} className={"review-large-displayer row"}>
                        <div className={"review-large-displayer row"}>
                            <div className={"col-2"}>
                                <img src={`${IMAGE_BASE_URL}/${review.posterURL}`} alt={review.movieTitle}
                                     className={"w-100 m-2"}/>
                            </div>

                            <div className={"col-10"}>
                                <div className={"my-3"}>
                                    <h5 className={"movie-title m-0"}>{review.movieTitle}</h5>
                                    <span className={"fs-2"}>
                            <StarRating rating={review.rating}/>
                            </span>
                                    <p className={"review-text"}>{review.reviewText}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            }
        </>
    )
}

export default SingleReviewLarge;
