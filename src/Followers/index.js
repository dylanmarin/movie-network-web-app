import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";
import {useSelector} from "react-redux";
import * as usersClient from "../Users/client.js";


const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const loggedInUser = useSelector((state) => state.usersReducer.loggedInUser);

    const fetchFollowers = async () => {
        const allUsers = await usersClient.findAllUsers();
        const followers = allUsers.filter((user) => user.following.includes(loggedInUser._id))
        setFollowers(followers);
    }

    useEffect(() => {
        fetchFollowers()
    }, [loggedInUser]);

    return (
        <div className={""}>
            <h4>Your Followers:</h4>
            {followers.map((follower) =>
                <Link to={`/users/${follower._id}`} className={"row mb-2"}>
                    <div className={"col-auto pe-0"}>
                        <FaUserCircle className={"fs-2"}/>
                    </div>
                    <div className={"col"}>
                        <h4 className={""}>
                            {follower.username}
                        </h4>

                        <p className={"m-0"}>{follower.bio}</p>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default Followers;
