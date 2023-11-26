import {useParams} from "react-router";
import PopularMovies from "../Shared/PopularMovies";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UsersSearchResults from "./UsersSearchResults";
import MovieSearchResults from "./MovieSearchResults";
import "./index.css"
import SearchBar from "./SearchBar";

const Search = () => {
    const {searchText} = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const submitSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/search/${searchTerm}`)
        }
    }

    useEffect(() => {
        setSearchTerm(searchText);
    }, [searchText]);

    return (
        <>
            <SearchBar initialText={searchText}/>

            {searchText &&
                <>
                    <UsersSearchResults/>
                    <MovieSearchResults/>
                </>
            }
            {!searchText &&
                <PopularMovies timeRange={"week"}/>
            }
        </>
    )
}

export default Search;
