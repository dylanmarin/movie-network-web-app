import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";
import {useSelector} from "react-redux";
import * as followsClient from "./client"

const Followers = () => {
    const [followersOfLoggedInUser, setFollowersOfLoggedInUser] = useState([]);
    const loggedInUser = useSelector((state) => state.usersReducer.loggedInUser);

    const fetchFollowers = async () => {
        const follows = await followsClient.findFollowersOfUser(loggedInUser._id);
        const followers = follows.map((follows) => follows['follower']);
        setFollowersOfLoggedInUser(followers);
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser) {
            fetchFollowers()
        } else {
            navigate("/signin")
            alert("You must be logged in to view your followers.")
        }
    }, [loggedInUser]);

    return (
        <div className={""}>
            <h4>Your Followers:</h4>
            {followersOfLoggedInUser.map((follower) =>
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
