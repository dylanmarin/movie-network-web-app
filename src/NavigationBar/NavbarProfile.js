import {Link} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";


const NavbarProfile = () => {

    return (
        <>
            <Link to={"/users/1"} className={"navbar-text movie-navbar-item"}>
                Profile
                <FaUserCircle className={"navbar-text movie-navbar-item profile-icon"}/>
            </Link>
        </>
    )

}

export default NavbarProfile;
