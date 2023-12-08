import {Link} from "react-router-dom";
import "./index.css"
import noPoster from "../Images/No-Poster.jpg";


const MovieStubSimple = ({movie}) => {

    const POSTER_URL = "https://image.tmdb.org/t/p/w500";
    const {poster_path, title} = movie;

    return (
        <Link to={`/movies/${movie.id}`}>
            <div className={"movie-recommendation-stub text-center pb-0 mb-0"}>

                <div className={"poster-wrapper"}>
                    {
                        poster_path &&
                        <img src={`${POSTER_URL}/${poster_path}`} alt={"poster"}
                             className={"movie-recommendation-stub-image"}/>
                    }
                    {
                        !poster_path &&
                        <img src={noPoster} alt={"poster"}
                             className={"movie-recommendation-stub-image"}/>
                    }
                </div>
                <h6 className={"movie-title"}>{title}</h6>
            </div>
        </Link>
    )
}

export default MovieStubSimple;
