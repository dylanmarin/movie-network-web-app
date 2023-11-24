import {useEffect, useState} from "react";
import {useParams} from "react-router";
import db from "../../Database"
import * as client from "../../client";
import MovieStubSimple from "../../Shared/MovieStubSimple";

const SimilarFilms = () => {
    const {movieId} = useParams();
    const [movie, setMovie] = useState({});
    const [recommendations, setRecommendations] = useState([]);

    const fetchRecommendations = async (movieId) => {
        const recommendations = await client.getMovieRecommendations(movieId)
        setRecommendations(recommendations)
    }

    useEffect(() => {
        const movie = db.movies.find((movie) => movie.id === parseInt(movieId))
        setMovie(movie);

        fetchRecommendations(movieId);

    }, [movieId]);

    return (
        <div className={"recommendations-slider-container"}>
            <h3 className={"m-0"}>Similar Films:</h3>
            <div className={"d-flex flex-row overflow-x-auto"}>

                {
                    recommendations.filter((movie) => movie.poster_path !== null).map((recommendation) => {
                        return (
                            <MovieStubSimple movie={recommendation} key={recommendation.id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SimilarFilms;
