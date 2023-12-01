import SingleReviewLarge from "./SingleReviewLarge";
import "./index.css"
const ReviewLargeDisplayer = ({reviews}) => {


    return (
        <div className={"reviews-list"}>
            {reviews.map((review, i) => {
                return (
                    <SingleReviewLarge key={i} review={review}/>
                )
            })}
        </div>
    )
}
export default ReviewLargeDisplayer;
