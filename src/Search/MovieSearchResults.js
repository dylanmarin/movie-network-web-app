import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as client from "../client";
import HorizontalMovieScroller from "../Shared/HorizontalMovieScroller";
import MoviesTiled from "../Shared/MoviesTiled";

const MovieSearchResults = () => {
    const {searchText} = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const fetchMovieSearch = async (searchText) => {
        const searchResults = await client.getMoviesSearchResults(searchText);
        setSearchResults(searchResults);
    };

    useEffect(() => {
        fetchMovieSearch(searchText);
    }, [searchText]);


    return (
        <>
            {
                searchResults &&
                <>
                    <h4>Showing results for: {searchText}</h4>
                    <MoviesTiled movies={searchResults}/>
                </>
            }
        </>
    )
}

export default MovieSearchResults;
