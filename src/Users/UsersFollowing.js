import {useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../Database"
import {Link} from "react-router-dom";


const UsersFollowing = () => {
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const [following, setFollowing] = useState({});

    useEffect(() => {
        const user = db.users.find((user) => user._id === parseInt(userId))
        setUser(user);

        const {following} = user;
        setFollowing(following)
    }, [userId]);


    return (
        <>
            {following && Object.keys(following).map((userId) => {
                    const username = following[userId];
                    return (
                        <div>
                            <Link to={`/users/${userId}`}>{username}</Link>
                        </div>
                    )
                }
            )}
        </>
    )

}

export default UsersFollowing;
