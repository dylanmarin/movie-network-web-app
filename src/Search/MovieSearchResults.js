import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as client from "../Movies/client";
import HorizontalMovieScroller from "../Shared/HorizontalMovieScroller";
import MoviesTiled from "../Shared/MoviesTiled";

const MovieSearchResults = () => {
    const {searchText} = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const fetchMovieSearch = async (searchText) => {
        const searchResults = await client.searchMovies(searchText);
        setSearchResults(searchResults);
    };

    useEffect(() => {
        fetchMovieSearch(searchText);
    }, [searchText]);


    return (
        <>
            {
                searchResults && searchResults.length > 0 &&
                <>
                    <h4>Showing results for: {searchText}</h4>
                    <MoviesTiled movies={searchResults}/>
                </>
            }
            {
                !searchResults || (searchResults && searchResults.length === 0) &&
                <>
                    <h4>Movies:</h4>
                <p>No movies found</p>
                </>
            }
        </>
    )
}

export default MovieSearchResults;
