import "./index.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Searchbar from "./Searchbar";
import NavbarProfile from "./NavbarProfile";
import {FaUserCircle} from "react-icons/fa";
import * as usersClient from "../Users/client";
import {useEffect, useState} from "react";

const NavigationBar = () => {
    const navigate = useNavigate();
    const [signedIn, setSignedIn] = useState(false);
    const [profileLink, setProfileLink] = useState("");
    const path = useLocation().pathname;
    const handleSignOut = async () => {
        await usersClient.signout();
        navigate(`/signin`);
    }


    useEffect(() => {
        const init = async () => {
            const currentUser = await usersClient.account();
            setProfileLink(`/users/${currentUser._id}`);

            if (currentUser._id !== undefined) {
                setSignedIn(true);
            }
        }

        init();
    }, [path]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to={"/home"} className="navbar-brand">WebsiteName</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">

                        <span className="navbar-toggler-icon"></span>

                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>

                            {!signedIn &&
                                <li className="nav-item">
                                    <Link to={"/signin"} className={"navbar-text movie-navbar-item"}>
                                        <>
                                            <div className={"profile-text"}>
                                                Sign In
                                            </div>
                                        </>
                                    </Link>
                                </li>
                            }

                            {signedIn &&
                                <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" href="#" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false">
                                    <NavbarProfile/>
                                </span>

                                    <ul className="dropdown-menu">
                                        <li><Link to={profileLink} className="dropdown-item" href="#">Profile</Link>
                                        </li>
                                        <li><Link to={"/followers"} className="dropdown-item" href="#">Followers</Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSignOut}>Sign Out</li>
                                    </ul>

                                </li>
                            }
                        </ul>
                        <Searchbar/>
                        {/*<form className="d-flex" role="search">*/}
                        {/*    <input className="form-control me-2" type="search" placeholder="Search"*/}
                        {/*           aria-label="Search"/>*/}
                        {/*    <button className="btn btn-outline-success" type="submit">Search</button>*/}
                        {/*</form>*/}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavigationBar;
