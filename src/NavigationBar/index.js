import "./index.css";
import {Link, useNavigate} from "react-router-dom";
import Searchbar from "./Searchbar";
import NavbarProfile from "./NavbarProfile";
import * as usersClient from "../Users/client";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../Users/usersReducer";
import wordmark from "../Images/Logo-Wordmark.png";

const NavigationBar = () => {
    const navigate = useNavigate();
    const [profileLink, setProfileLink] = useState("");

    const loggedInUser = useSelector((state) => state.usersReducer.loggedInUser);

    const [signedIn, setSignedIn] = useState(loggedInUser && (loggedInUser._id !== null));
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        await usersClient.signout();
        dispatch(logout());
        navigate(`/signin`);
    }

    useEffect(() => {
        setSignedIn(loggedInUser && (loggedInUser._id !== undefined));
        setProfileLink(`/users/${loggedInUser?._id}`);
    }, [loggedInUser]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to={"/home"} className="navbar-brand">
                        <div className={""}>
                            <img src={wordmark} alt={"logo"} className={"logo-wordmark"}/>
                        </div>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">

                        <span className="navbar-toggler-icon"></span>

                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>

                            {!signedIn &&
                                <li className="nav-item">
                                    <Link to={"/signin"} className={"navbar-text nav-link movie-navbar-item"}>
                                        Sign In
                                    </Link>
                                </li>
                            }

                            {signedIn &&
                                <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" href="#" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false">
                                    <NavbarProfile username={(loggedInUser && loggedInUser.username) || 'Profile'}/>
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

                            {signedIn && loggedInUser && loggedInUser.role === "ADMIN" &&
                                <li className="nav-item">
                                    <Link to={"/admin"} className={"navbar-text nav-link movie-navbar-item"}>
                                        ADMIN CONTROLS
                                    </Link>
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
