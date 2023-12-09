import {useEffect, useState} from "react";
import {useParams} from "react-router";
import UserSearchStub from "./UserSearchStub";
import * as client from "../Users/client";
import {searchUsersByText} from "../Users/client";

const UsersSearchResults = () => {
    const [users, setUsers] = useState([]);
    const {searchText} = useParams();


    useEffect(() => {

        const searchUsers = async (searchText) => {
            const response = await client.searchUsersByText(searchText);
            setUsers(response);
        }

        searchUsers(searchText);
    }, [searchText]);

    return (
        <>
            <h4>Users</h4>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                {
                    users && users.length > 0 &&
                    users.map((user) => (
                        <UserSearchStub user={user}/>
                    ))
                }
            </div>
            {
                !users || (users && users.length === 0) &&
                <p>No users found</p>
            }
        </>
    )
}

export default UsersSearchResults;
