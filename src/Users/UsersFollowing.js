import {useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../Database"
import {Link} from "react-router-dom";
import * as usersClient from "./client";


const UsersFollowing = () => {
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const [following, setFollowing] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {

        const getUser = async () => {
            const user = await usersClient.findUserById(userId);
            const allUsers = await usersClient.findAllUsers();

            setAllUsers(allUsers);
            setUser(user);
            const {following} = user;
            setFollowing(following)
        }

        getUser(user);

    }, [userId]);

    console.log(following)


    return (
        <>
            {following && following.map((userId) => {
                    const {username} = allUsers.find((user) => user._id === userId);
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
