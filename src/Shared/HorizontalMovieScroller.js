import MovieReviewStub from "../Users/MovieReviewStub";
import MovieStubSimple from "./MovieStubSimple";

const HorizontalMovieScroller = ({movies}) => {

    return (
        <div className={"movie-scroller-container"}>
            <div className={"movie-scroller"}>

                {
                    movies.map((movie) =>
                        <>
                            <MovieStubSimple movie={movie}/>
                        </>
                    )
                }
            </div>
        </div>
    )

}

export default HorizontalMovieScroller;
