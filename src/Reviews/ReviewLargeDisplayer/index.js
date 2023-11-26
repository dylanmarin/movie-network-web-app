import SingleReviewLarge from "./SingleReviewLarge";
import "./index.css"
const ReviewLargeDisplayer = ({reviews}) => {


    return (
        <div className={"reviews-list"}>
            {reviews.map((review) => {
                return (
                    <SingleReviewLarge review={review}/>
                )
            })}
        </div>
    )
}
export default ReviewLargeDisplayer;
