import {useEffect, useState} from "react";
import db from "../Database"
import {Link} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";


const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const currentUserId = 1;
    const fetchFollowers = () => {
        const followers = db.users.filter((user) => Object.keys(user.following).includes(currentUserId.toString()));
        setFollowers(followers);
    }

    useEffect(() => {
        fetchFollowers()
    }, []);


    console.log(followers)
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
                        </div>
                    </Link>
            )}
        </div>
    )
}

export default Followers;
