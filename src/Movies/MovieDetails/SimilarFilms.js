import {useEffect, useState} from "react";
import {useParams} from "react-router";
import db from "../../Database"
import * as client from "../../client";
import MovieRecommendationStub from "./MovieRecommendationStub";

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

        var e = document.getElementById("movie-scroll");
        e.scrollTop = 0;

    }, [movieId]);

    return (
        <>
            <h3>Similar Films:</h3>
            <div id={"movie-scroll"} className={"d-flex flex-row overflow-x-auto"}>

                {
                    recommendations.filter((movie) => movie.poster_path !== null).map((recommendation) => {
                        return (
                            <MovieRecommendationStub movie={recommendation} key={recommendation.id}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SimilarFilms;
