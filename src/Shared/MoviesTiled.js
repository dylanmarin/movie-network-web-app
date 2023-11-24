import MovieStubSimple from "./MovieStubSimple";

const MoviesTiled = ({movies}) => {

    return (
        <div className="d-flex flex-row flex-wrap movie-grid-container">
            {movies.map((movie) => (
                <MovieStubSimple movie={movie}/>
            ))}
        </div>
    )
}

export default MoviesTiled;
