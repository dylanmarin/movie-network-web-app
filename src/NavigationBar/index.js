import "./index.css";
import {Link, useNavigate} from "react-router-dom";
import Searchbar from "./Searchbar";

const NavigationBar = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={"movie-navbar"}>
                <nav className={"navbar movie-navbar-links"}>
                    <h2
                        onClick={() => navigate("")}
                        className={"navbar-brand movie-navbar-item"}
                    >
                        WebsiteName
                    </h2>
                    <Link to={""} className={"navbar-text movie-navbar-item"}>Home</Link>
                    <Link to={"/movies"} className={"navbar-text movie-navbar-item"}>Movies</Link>
                    <Link to={""} className={"navbar-text movie-navbar-item"}>Following</Link>
                    <Link to={"/movies/146015"} className={"navbar-text movie-navbar-item"}>The Double</Link>
                    <Link to={"/users/1"} className={"navbar-text movie-navbar-item"}>Profile</Link>
                    <Searchbar/>
                </nav>
            </div>
            <div className={"navbar-spacer"}/>
        </>
    )
}

export default NavigationBar;
