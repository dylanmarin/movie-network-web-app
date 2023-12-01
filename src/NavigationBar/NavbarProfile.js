import {Link, useLocation} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";
import {useEffect, useState} from "react";
import * as usersClient from "../Users/client";


const NavbarProfile = () => {
    return (
        <>
            <a href="">
                <div className={"profile-text"}>
                    Profile
                </div>
                <FaUserCircle className={"navbar-text movie-navbar-item profile-icon"}/>
            </a>
        </>
    )

}

export default NavbarProfile;
