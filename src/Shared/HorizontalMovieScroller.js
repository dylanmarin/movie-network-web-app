import MovieStubSimple from "./MovieStubSimple";

const HorizontalMovieScroller = ({movies}) => {

    return (
        <div className={"movie-scroller-container"}>
            <div className={"movie-scroller"}>
                {
                    movies.map((movie, i) =>
                        <MovieStubSimple key={i} movie={movie}/>
                    )
                }
            </div>
        </div>
    )

}

export default HorizontalMovieScroller;
