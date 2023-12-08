import "./index.css"
import {Link} from "react-router-dom";
import StarRating from "../../StarRating";

const SingleReviewLarge = ({review}) => {
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    return (
        <>
            {review &&
                <div className={"p-1"}>
                    <Link to={`/reviews/${review._id}`} className={"review-large-displayer row"}>
                        <div className={"review-large-displayer row"}>
                            <div className={"col-auto poster-container-small"}>
                                <img src={`${IMAGE_BASE_URL}/${review.posterURL}`} alt={review.movieTitle}
                                     className={"w-100 m-2"}/>
                            </div>

                            <div className={"col-md"}>
                                <div className={"my-3"}>
                                    <h4 className={"movie-title m-0"}>{review.movieTitle}</h4>
                                    <h5 className={"mb-1 d-inline"}>{review.user.username} rated it: </h5>
                                    <span className={"fs-3 d-inline-block"}>
                                        <StarRating rating={review.rating}/>
                                    </span>
                                    <p className={"review-text ms-2"}>{review.reviewText}</p>
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
