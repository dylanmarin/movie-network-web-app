import {useState} from "react";
import {useNavigate} from "react-router-dom";


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
                <input className={"form-control w-25 d-inline me-1"} placeholder={"Search movies and users"}
                       value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

                <button className={"btn btn-secondary"}>Search</button>
            </form>
        </>
    )

}

export default SearchBar;
