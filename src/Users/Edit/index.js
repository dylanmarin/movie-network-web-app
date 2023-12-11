import {useParams} from "react-router";
import {useEffect, useState} from "react";
import "../index.css"
import {FaCircleUser} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import * as usersClient from "../client";


const EditUsers = () => {
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const loggedInUser = useSelector(state => state.usersReducer.loggedInUser);
    const [originalUser, setOriginalUser] = useState({});

    const allowedToEdit = (loggedInUser && (userId === loggedInUser._id || loggedInUser.role === "ADMIN"));
    const validUserId = userId.length === 24;

    useEffect(() => {
        const getUserInfo = async () => {
            const user = await usersClient.findUserById(userId);
            setOriginalUser(user);
            setUser(user);
        }


        if (validUserId && allowedToEdit) {
            getUserInfo();
        } else {
            navigate("/home");
        }
    }, [userId]);

    const {username, password, bio, photoURL, email, name} = user;

    const handleSave = async () => {
        // validate username
        // if username was changed
        if (username !== originalUser.username) {
            // if username is not the same as the logged in user or the logged in user is not an admin
            if (username !== loggedInUser.username && loggedInUser.role !== "ADMIN") {
                const allUsers = await usersClient.findAllUsers();
                const usernameTaken = allUsers.some((user) => user.username === username);

                if (usernameTaken) {
                    alert("username taken");
                    return;
                }

                const usernameLongEnough = username.length > 3;

                if (!usernameLongEnough) {
                    alert("username must be at least 4 characters");
                    return;
                }
            }
        }


        // validate email
        if (email !== originalUser.email) {
            if (email !== loggedInUser.email) {
                const validEmail = user.email.includes("@") && user.email.includes(".") || user.email === "";
                if (!validEmail) {
                    alert("invalid email, must contain @ and .");
                    return;
                }
            }
        }

        // validate password
        if (password !== originalUser.password) {
            if (password !== loggedInUser.password) {
                const validPassword = user.password.length > 5;
                if (!validPassword) {
                    alert("password must be at least 6 characters");
                    return;
                }
            }
        }

        // validate bio less than 140 characters
        if (bio.length > 140) {
            alert("bio must be less than 140 characters");
            return;
        }

        const status = await usersClient.updateUser(userId,
            {
                ...originalUser,
                ...user
            });

        if (status.matchedCount === 1) {
            navigate(`/users/${userId}`)
        } else {
            alert("error updating user");
        }
    }

    const handleCancel = () => {
        navigate(`/users/${userId}`)
    }


    return (
        <div>
            {
                user &&
                <div className={"row"}>
                    <div className={"col-8"}>
                        <div className={"row"}>
                            <div id={'profile-photo-username'} className={"col-md-auto text-center"}>
                                <>
                                    {photoURL && <img src={photoURL} alt={"profile-photo"}
                                                      className={"profile-photo d-block"}/>}
                                    {!photoURL && <FaCircleUser size={90} className={'d-block mx-auto'}/>}
                                </>
                                <a className={"mx-auto"}>Edit Photo</a>
                            </div>


                            <div className={"col-sm edit-profile-forms"}>
                                <label htmlFor={"username"}>Username</label>
                                <input id={"username"} className={"form-control"} placeholder={"username"}
                                       value={username}
                                       onChange={(e) => setUser({...user, "username": e.target.value})}/>
                                <label htmlFor={"password"}>Password</label>
                                <input id={"password"} className={"form-control"} placeholder={"password"}
                                       type={"password"} value={password}
                                       onChange={(e) => setUser({...user, "password": e.target.value})}/>
                                <label htmlFor={"name"}>Name</label>
                                <input id={"name"} className={"form-control"} placeholder={"first name"}
                                       value={name}
                                       onChange={(e) => setUser({...user, "name": e.target.value})}/>
                                <label htmlFor={"email"}>Email</label>
                                <input id={"email"} className={"form-control"} placeholder={"email"} value={email}
                                       onChange={(e) => setUser({...user, "email": e.target.value})}/>
                                <label htmlFor={"bio"}>Bio (
                                    {bio && bio.length}
                                    {!bio && 0}
                                    /140)</label>
                                <textarea id={"bio"} className={"form-control"} placeholder={"bio"} value={bio}
                                          onChange={(e) => setUser({...user, "bio": e.target.value})}/>
                            </div>

                        </div>
                    </div>

                    <div className={"col-auto mt-0"}>
                        <button className={"btn cin-btn-secondary mx-1"} onClick={handleSave}>save
                        </button>
                        <button className={"btn cin-btn-secondary mx-1"} onClick={handleCancel}>cancel
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}


export default EditUsers;
