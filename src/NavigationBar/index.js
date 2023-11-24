import "./index.css";
import {Link, useNavigate} from "react-router-dom";
import Searchbar from "./Searchbar";
import NavbarProfile from "./NavbarProfile";

const NavigationBar = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={"movie-navbar"}>
                <nav className={"navbar movie-navbar-links"}>
                    <div className={"col"}>

                        <Link to={""} className={"navbar-text movie-navbar-item"}>Home</Link>

                        <Link to={""} className={"navbar-text movie-navbar-item"}>Following</Link>
                    </div>

                    <h2
                        onClick={() => navigate("")}
                        className={"navbar-brand movie-navbar-item text-center col-auto"}
                    >
                        WebsiteName
                    </h2>

                    <div className={"col float-end d-flex flex-row-reverse"}>
                        {/*<Link to={"/movies/146015"} className={"navbar-text movie-navbar-item"}>The Double</Link>*/}
                        <NavbarProfile/>
                        <Searchbar/>
                    </div>
                </nav>
            </div>
            {/*<div className={"movie-navbar-spacer"}/>*/}
        </>
    )
}

export default NavigationBar;
