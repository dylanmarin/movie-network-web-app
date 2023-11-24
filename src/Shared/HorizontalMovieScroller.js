import MovieReviewStub from "../Users/MovieReviewStub";
import MovieStubSimple from "./MovieStubSimple";

const HorizontalMovieScroller = ({title, movies}) => {

    return (
        <div className={"movie-scroller-container"}>
            <h4>{title}</h4>
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
