import "./index.css"

const SignIn = () => {
    const submitForm = () => {

    }

    return (
        <div className={"text-center"}>

            <div className={"signin-box"}>

                <form onSubmit={submitForm}>
                    <h4>Sign In</h4>

                    <input className={"form-control m-1"} placeholder={"Username"}/>

                    <input className={"form-control m-1"} placeholder={"Password"} type={"password"}/>

                    <button className={"btn btn-secondary w-100 m-1"}>Sign In</button>

                    <button className={"btn btn-secondary w-100 m-1"}>Create Account</button>
                </form>

            </div>

        </div>
    )
}

export default SignIn;
