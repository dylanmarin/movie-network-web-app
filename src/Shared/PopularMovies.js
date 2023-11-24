import * as client from "../client";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import MovieStubSimple from "./MovieStubSimple";
import HorizontalMovieScroller from "./HorizontalMovieScroller";


const PopularMovies = ({timeRange}) => {
    const [popularMovies, setPopularMovies] = useState([]); // [1
    const fetchPopularMovies = async () => {
        const popularMovies = await client.getPopularMovies(timeRange);
        setPopularMovies(popularMovies);
    }

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    return (
        <>
            <HorizontalMovieScroller title={`Popular This ${timeRange}`} movies={popularMovies}/>
        </>
    )
}

export default PopularMovies;
