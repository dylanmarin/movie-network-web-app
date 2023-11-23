import MovieDetailsReview from "./MovieDetailsReview";

const DetailsSidebar = () => {
    return (
        <>
            <h2>Following:</h2>
            Users who you follow that have watched this movie:
            <div className={"list-group"}>
                {/*{reviews.map((review) =>*/}
                {/*    <MovieDetailsReview key={review._id} review={review}/>*/}
                {/*)}*/}
            </div>
        </>
    );
}

export default DetailsSidebar;
