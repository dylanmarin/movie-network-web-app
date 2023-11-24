import "./index.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";

const Searchbar = () => {
    const [searchString, setSearchString] = useState("");
    const navigate = useNavigate();

    const submitSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${searchString}`);
    }

    return (
        <form className={"searchbar d-flex flex-row"} onSubmit={submitSearch}>
            <input type={"text"} placeholder={"Search movies and users"}
                   className={"movie-navbar-item form-control mx-0"} value={searchString || ""}
                   onChange={(e) => setSearchString(e.target.value)}/>
            <button className={"btn btn-secondary movie-navbar-item ms-1"}>Search</button>
        </form>
    )
}
export default Searchbar;
