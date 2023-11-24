import "./index.css";
const Searchbar = () => {
    return (
        <form className={"searchbar d-flex flex-row"}>
            <input type={"text"} placeholder={"Search movies and users"} className={"movie-navbar-item form-control mx-0"}/>
            <button className={"btn btn-secondary movie-navbar-item ms-1"}>Search</button>
        </form>
    )
}
export default Searchbar;
