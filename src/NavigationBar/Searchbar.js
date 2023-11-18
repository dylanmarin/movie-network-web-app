import "./index.css";
const Searchbar = () => {
    return (
        <form className={"searchbar d-flex flex-row"}>
            <input type={"text"} placeholder={"Search movies and users"} className={"form-control nav"}/>
            <button className={"btn btn-primary movie-navbar-item"}>Search</button>
        </form>
    )
}
export default Searchbar;
