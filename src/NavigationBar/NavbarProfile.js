import {Link} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";
import {useState} from "react";


const NavbarProfile = () => {
    const [signedIn, setSignedIn] = useState(true);

    return (
        <>
            <Link to={"/users/1"} className={"navbar-text movie-navbar-item"}>

                {
                    signedIn &&
                    <>
                        <div className={"profile-text"}>
                            Profile
                        </div>
                        <FaUserCircle className={"navbar-text movie-navbar-item profile-icon"}/>
                    </>
                }
            </Link>
            <Link to={"/signin"} className={"navbar-text movie-navbar-item"}>
                {
                    !signedIn &&
                    <>
                        <div className={"profile-text"}>
                            Sign In
                        </div>
                    </>
                }
            </Link>
        </>
    )

}

export default NavbarProfile;
