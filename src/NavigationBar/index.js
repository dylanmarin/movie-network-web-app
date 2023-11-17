import "./index.css";
import {Link} from "react-router-dom";
import Searchbar from "./Searchbar";

const NavigationBar = () => {
    return (
        <>
            <div className={"movie-navbar"}>
                <nav className={"navbar movie-navbar-links"}>
                    <Link to={""} className={""}>Logo</Link>
                    <Link to={""} className={""}>Home</Link>
                    <Link to={""} className={""}>Profile</Link>
                </nav>
                <Searchbar/>
            </div>
            {/*<div className={"navbar-spacer"}/>*/}
        </>
    )
}

export default NavigationBar;
