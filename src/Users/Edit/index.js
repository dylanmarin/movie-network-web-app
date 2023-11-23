import {useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../../Database"
import MovieReviewStub from "../MovieReviewStub";
import "../index.css"
import UsersFollowing from "../UsersFollowing";
import {FaCircleUser} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";


const EditUsers = () => {
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const user = db.users.find((user) => user._id === parseInt(userId))
        setUser(user);

    }, [userId]);

    const {username, bio, photoURL, email, firstName, lastName} = user;

    const handleSave = () => {
        // validate email
        // validate password
        // validate username is unique

        // validate no field is empty
        navigate(`/users/${userId}`)
    }

    const handleCancel = () => {
        navigate(`/users/${userId}`)
    }


    return (
        <div>
            <div className={"row"}>
                <div className={"col-8"}>
                    <div className={"row"}>
                        <div id={'profile-photo-username'} className={"col-auto text-center"}>
                            <>
                                {photoURL && <img src={photoURL} alt={"profile-photo"}
                                                  className={"profile-photo d-block"}/>}
                                {!photoURL && <FaCircleUser size={90} className={'d-block'}/>}
                            </>
                            <a className={"mx-auto"}>Edit Photo</a>
                        </div>


                        <div className={"col edit-profile-forms"}>
                            <label htmlFor={"username"}>Username</label>
                            <input id={"username"} className={"form-control"} placeholder={"username"} value={username}
                                   onChange={(e) => setUser({...user, "username": e.target.value})}/>
                            <label htmlFor={"firstName"}>First Name</label>
                            <input id={"firstName"} className={"form-control"} placeholder={"first name"}
                                   value={firstName}
                                   onChange={(e) => setUser({...user, "firstName": e.target.value})}/>
                            <label htmlFor={"lastName"}>Last Name</label>
                            <input id={"lastName"} className={"form-control"} placeholder={"last name"} value={lastName}
                                   onChange={(e) => setUser({...user, "lastName": e.target.value})}/>
                            <label htmlFor={"email"}>Email</label>
                            <input id={"email"} className={"form-control"} placeholder={"email"} value={email}
                                   onChange={(e) => setUser({...user, "email": e.target.value})}/>
                            <label htmlFor={"password"}>Password</label>
                            <input id={"password"} className={"form-control"} placeholder={"password"} type={"password"}
                                   onChange={(e) => setUser({...user, "password": e.target.value})}/>
                            <label htmlFor={"bio"}>Bio</label>
                            <textarea id={"bio"} className={"form-control"} placeholder={"bio"} value={bio}
                                      onChange={(e) => setUser({...user, "bio": e.target.value})}/>
                        </div>

                    </div>
                </div>

                <div className={"col mt-0"}>
                    <button className={"btn btn-secondary edit-profile-button mx-1"} onClick={handleSave}>save</button>
                    <button className={"btn btn-secondary edit-profile-button mx-1"} onClick={handleCancel}>cancel
                    </button>
                </div>
            </div>
        </div>
    )
}


export default EditUsers;
