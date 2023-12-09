import "./index.css"
import * as usersClient from "../Users/client.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLoggedInUser} from "../Users/usersReducer";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitForm = async () => {

        console.log('making signin attempt')
        const response = await usersClient.signin({username, password})
        console.log('signin attempt response', response)
        if (response) {
            dispatch(setLoggedInUser(response));
            navigate(`/users/${response._id}`)
        } else {
            alert("Invalid username or password")
        }
    }

    const submitCreateAccount = async () => {
        const response = await usersClient.signup({username, password, role: role})
        if (response) {
            dispatch(setLoggedInUser(response));
            navigate(`/users/${response._id}`)
        } else {
            alert("Username taken")
        }
    }


    const loggedInUser = useSelector((state) => state.usersReducer.loggedInUser);
    useEffect(() => {
        if (loggedInUser) {
            navigate(`/users/${loggedInUser._id}`)
        }
    }, []);

    return (
        <div className={"text-center"}>
            <div className={"signin-box"}>

                <form onSubmit={submitForm}>
                    <h4>Sign In</h4>

                    <input className={"form-control m-0 mb-2"} placeholder={"Username"} value={username}
                           onChange={(e) => setUsername(e.target.value)}/>

                    <input className={"form-control m-0 mb-2"} placeholder={"Password"} type={"password"} value={password}
                           onChange={(e) => setPassword(e.target.value)}/>

                    <button className={"btn cin-btn-secondary w-100 mb-2 m-0"}>Sign In</button>
                </form>

                <div className={"row gx-0"}>
                    <button className={"btn cin-btn-secondary m-0 col mx-auto me-1"} onClick={submitCreateAccount}>Create Account
                    </button>
                    <select className={"form-select m-0 col mx-auto ms-1"} onChange={(e) => setRole(e.target.value)}>
                        <option>USER</option>
                        <option>MODERATOR</option>
                        <option>ADMIN</option>
                    </select>
                </div>

            </div>

        </div>
    )
}

export default SignIn;
