import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as usersClient from "../Users/client";
import {FaUserCircle} from "react-icons/fa";

const Admin = () => {
    const navigate = useNavigate();

    const loggedInUser = useSelector((state) => state.usersReducer.loggedInUser);
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const isAdmin = loggedInUser && (loggedInUser._id !== undefined) && (loggedInUser.role === "ADMIN");
        if (!isAdmin) {
            navigate("/home");
        }

        const fetchUsers = async () => {
            const users = await usersClient.findAllUsers();
            setUsers(users);
        }

        fetchUsers();
    }, [loggedInUser]);

    const handleDelete = async (userId) => {
        await usersClient.deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
    }

    return (
        <div className={"container"}>
            <h1>All Users</h1>
            <div className={"list-group"}>
                {users.map((user, i) =>
                    (<div className={"list-group-item"} key={user._id}>

                        <Link key={i} to={`/users/${user._id}`} className={"mb-2 d-inline-flex"}>
                            <div className={"row"}>

                                <div className={"col-auto pe-0"}>
                                    <FaUserCircle className={"fs-2"}/>
                                </div>
                                <div className={"col"}>
                                    <h4 className={""}>
                                        {user.username}
                                    </h4>

                                    <p className={"m-0"}>{user.bio}</p>
                                </div>
                            </div>
                        </Link>
                        {
                            (user._id !== loggedInUser._id) &&
                            <button className={"btn cin-btn-danger float-end"} onClick={() => {
                                handleDelete(user._id)
                            }}>Delete
                            </button>
                        }
                    </div>))}
            </div>

        </div>
    )

}

export default Admin
