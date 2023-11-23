import {Link} from "react-router-dom";
import "./index.css"

const MovieRecommendationStub = ({movie}) => {

    const POSTER_URL = "https://image.tmdb.org/t/p/w500";
    const {poster_path, title} = movie;

    return (
        <Link to={`/movies/${movie.id}`}>
            <div className={"movie-recommendation-stub text-center"}>
                <img src={`${POSTER_URL}/${poster_path}`} alt={"poster"} className={"movie-recommendation-stub-image"}/>
                <h6>{title}</h6>
            </div>
        </Link>
    )
}

export default MovieRecommendationStub;
