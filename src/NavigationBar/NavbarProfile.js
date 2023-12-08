import {FaUserCircle} from "react-icons/fa";

const NavbarProfile = ({username="Profile"}) => {
    return (
        <>
            <a href="">
                <div className={"profile-text"}>
                    {username}
                </div>
                <FaUserCircle className={"navbar-text movie-navbar-item profile-icon"}/>
            </a>
        </>
    )

}

export default NavbarProfile;
