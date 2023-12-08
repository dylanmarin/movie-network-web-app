import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as followsClient from "../Followers/client";
import "./index.css"

const UsersFollowing = () => {
    const {userId} = useParams();
    const [usersFollowedByThisUser, setUsersFollowedByThisUser] = useState([]);

    useEffect(() => {
        const getFollowers = async () => {
            const follows = await followsClient.findFollowedUsersByUser(userId);
            const usersBeingFollowed = follows.map((follows) => follows['followed']);

            setUsersFollowedByThisUser(usersBeingFollowed);
        }

        getFollowers();

    }, [userId]);

    return (
        <>
            {usersFollowedByThisUser && usersFollowedByThisUser.map((user, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/users/${user._id}`} className={"cin-link-underline"}>{user.username}</Link>
                        </div>
                    )
                }
            )}
        </>
    )

}

export default UsersFollowing;
