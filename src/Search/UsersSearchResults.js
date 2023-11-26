import {useEffect, useState} from "react";
import db from "../Database";
import {useParams} from "react-router";
import UserSearchStub from "./UserSearchStub";

const UsersSearchResults = () => {
    const [users, setUsers] = useState([]);
    const {searchText} = useParams();

    useEffect(() => {
        setUsers(db.users);
    }, [searchText]);

    return (
        <>
            <h4>Users</h4>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                {
                    users &&
                    users.map((user) => (
                        <UserSearchStub user={user}/>
                    ))
                }
            </div>
            {
                !users &&
                <p>No users found</p>
            }
        </>
    )
}

export default UsersSearchResults;
