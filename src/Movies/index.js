import {useParams} from "react-router";

const Movies = () => {
    const {movieId} = useParams();

    return (
        <div>
            <h1>Movies</h1>
            <h2>Movie ID: {movieId}</h2>
        </div>
    );
}

export default Movies;
