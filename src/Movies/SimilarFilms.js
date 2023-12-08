import {useEffect, useState} from "react";
import {useParams} from "react-router";
import * as client from "./client";
import MovieStubSimple from "../Shared/MovieStubSimple";
import HorizontalMovieScroller from "../Shared/HorizontalMovieScroller";

const SimilarFilms = () => {
    const {movieId} = useParams();
    const [recommendations, setRecommendations] = useState([]);


    const fetchRecommendations = async (movieId) => {
        const recommendations = await client.getMovieRecommendations(movieId)


        setRecommendations(recommendations.filter((movie) => movie.id !== 617932));
    }

    useEffect(() => {
        fetchRecommendations(movieId);
    }, [movieId]);

    return (
        <div className={"recommendations-slider-container"}>
            <h3 className={"m-0 mb-1"}>Similar Films:</h3>

            {
                recommendations.length === 0 &&
                <p>We actually aren't sure what films are like this one right now, sorry!</p>
            }
            {
                recommendations.length > 0 &&
                <HorizontalMovieScroller movies={recommendations}/>
            }

            {/*<div className={"d-flex flex-row overflow-x-auto"}>*/}
            {/*    {*/}
            {/*        recommendations.filter((movie) => movie.poster_path !== null).map((recommendation) => {*/}
            {/*            return (*/}
            {/*                <MovieStubSimple movie={recommendation} key={recommendation.id}/>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</div>*/}

        </div>
    )
}

export default SimilarFilms;
