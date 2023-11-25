import {FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom";


const UserSearchStub = ({user}) => {

    return (
        <div className={"w-50 my-1 pt-1 user-search-stub"}>
            <Link to={`/users/${user._id}`}>
                <div className={"row"}>

                    <div className={"col-3 text-center"}>

                        <FaUserCircle className={"fs-1"}/>
                        <h6>{user.username}</h6>
                    </div>
                    <div className={"col"}>
                        <p className={"mt-2 mb-0"}>
                            {user.bio}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default UserSearchStub;
