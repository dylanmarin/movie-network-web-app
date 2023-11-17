import "./index.css";
const Searchbar = () => {
    return (
        <div className={"searchbar"}>
            <input type={"text"} placeholder={"Search movies and users"} className={"form-control"}/>
            <button className={"btn btn-primary"}>Search</button>
        </div>
    )
}
export default Searchbar;
