import {useParams} from "react-router";
import PopularMovies from "../Shared/PopularMovies";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UsersSearchResults from "./UsersSearchResults";
import MovieSearchResults from "./MovieSearchResults";
import "./index.css"

const Search = () => {
    const {searchText} = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const submitSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${searchTerm}`)
    }

    useEffect(() => {
        setSearchTerm(searchText);
    }, [searchText]);

    return (
        <>
            <form className={"mb-2"} onSubmit={submitSearch}>

                <input className={"form-control w-25 d-inline me-1"} placeholder={"Search movies and users"}
                       value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

                <button className={"btn btn-secondary"}>Search</button>
            </form>

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
