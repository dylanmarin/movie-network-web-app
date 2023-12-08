import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./index.css"

const SearchBar = ({initialText}) => {
    const [searchTerm, setSearchTerm] = useState(initialText || "");
    const navigate = useNavigate();

    const submitSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/search/${searchTerm}`)
        }
    }

    return (
        <>
            <form className={"mb-2"} onSubmit={submitSearch}>
                <input className={"form-control d-inline me-1 searchbar-input"} placeholder={"Search movies and users"}
                       value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

                <button className={"btn cin-btn-secondary"}>Search</button>
            </form>
        </>
    )

}

export default SearchBar;
