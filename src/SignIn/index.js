import "./index.css"
import * as usersClient from "../Users/client.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLoggedInUser} from "../Users/usersReducer";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitForm = async () => {
        const response = await usersClient.signin({username, password})
        if (response) {
            dispatch(setLoggedInUser(response));
            navigate(`/users/${response._id}`)
        } else {
            alert("Invalid username or password")
        }
    }

    const submitCreateAccount = async () => {
        const response = await usersClient.signup({username, password})
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

                    <input className={"form-control m-1"} placeholder={"Username"} value={username}
                           onChange={(e) => setUsername(e.target.value)}/>

                    <input className={"form-control m-1"} placeholder={"Password"} type={"password"} value={password}
                           onChange={(e) => setPassword(e.target.value)}/>

                    <button className={"btn btn-secondary w-100 m-1"}>Sign In</button>
                </form>

                <button className={"btn btn-secondary w-100 m-1"} onClick={submitCreateAccount}>Create Account</button>

            </div>

        </div>
    )
}

export default SignIn;
