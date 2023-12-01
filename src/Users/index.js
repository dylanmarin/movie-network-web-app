import {useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../Database"
import MovieReviewStub from "./MovieReviewStub";
import "./index.css"
import UsersFollowing from "./UsersFollowing";
import {FaCircleUser} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import ReviewLargeDisplayer from "../Reviews/ReviewLargeDisplayer";
import * as usersClient from "./client.js";


const Users = () => {
    const navigate = useNavigate();
    const {userId} = useParams();
    const [currentUser, setCurrentUser] = useState({});
    const [user, setUser] = useState({});
    const [following, setFollowing] = useState(false);

    const getAccount = async () => {
        const response = await usersClient.account();
        setCurrentUser(response);
    }

    const getUser = async (userId) => {
        const response = await usersClient.findUserById(userId);
        setUser(response);
    }

    useEffect(() => {
        getAccount();
        getUser(userId);

    }, [userId]);



    const reviews = user.reviews;

    if (currentUser !== {}) {
        console.log(currentUser)
        // setFollowing(Object.keys(currentUser.following).includes(user._id));
    }

    const {username, bio, photoURL} = user;

    const handleSignOut = async () => {
        await usersClient.signout();
        navigate(`/signin`);
    }

    const handleFollow = () => {
        setFollowing(true);
    }

    const handleUnfollow = () => {
        setFollowing(false);
    }

    return (
        <>
            {currentUser && user &&
                <div>
                    <div className={""}>
                        <div className={"row"}>
                            <div id={'profile-photo-username'} className={"col "}>
                                <div className={"row"}>
                                    <div className={"col-4"}>
                                        <>
                                            {photoURL && <img src={photoURL} alt={"profile-photo"}
                                                              className={"profile-photo"}/>}
                                            {!photoURL && <FaCircleUser size={90}/>}
                                        </>
                                    </div>
                                </div>

                                <div className={"d-flex flex-row"}>
                                    <h1 className={"username-bold me-5"}>{username}</h1>
                                    {
                                        (user._id === currentUser._id) &&
                                        <>
                                            <button className={'btn btn-secondary edit-profile-button'}
                                                    onClick={() => navigate(`/users/edit/${userId}`)}>
                                                edit profile
                                            </button>
                                            <button className={'btn btn-secondary edit-profile-button ms-2'}
                                                    onClick={handleSignOut}>
                                                sign out
                                            </button>
                                        </>
                                    }
                                    {
                                        (user._id !== currentUser._id) &&
                                        <>
                                            {following &&
                                                <button className={'btn btn-secondary edit-profile-button'}
                                                        onClick={handleUnfollow}>
                                                    unfollow
                                                </button>
                                            }
                                            {!following &&
                                                <button className={'btn btn-secondary edit-profile-button ms-2'}
                                                        onClick={handleFollow}>
                                                    follow
                                                </button>
                                            }
                                        </>
                                    }
                                </div>

                            </div>
                            {/*<div className={"col-2"}>*/}
                            {/*    {*/}
                            {/*        (user._id === currentUser._id) &&*/}
                            {/*        <button className={'btn btn-secondary edit-profile-button ms-2'}*/}
                            {/*                onClick={() => {*/}
                            {/*                    navigate('/followers')*/}
                            {/*                }}>*/}
                            {/*            followers*/}
                            {/*        </button>*/}
                            {/*    }*/}
                            {/*</div>*/}
                            {/*<div className={"col-4"}>*/}
                            {/*    <h2>Following:</h2>*/}
                            {/*    <UsersFollowing/>*/}
                            {/*</div>*/}
                        </div>

                        <p>{bio}</p>

                        {/*<div>*/}
                        {/*    <h4>Recently watched by {username}</h4>*/}
                        {/*    <div className={"reviewed-movies"}>*/}
                        {/*        {*/}
                        {/*            reviews.map((review) =>*/}
                        {/*                <>*/}
                        {/*                    <MovieReviewStub review={review}/>*/}
                        {/*                </>*/}
                        {/*            )*/}
                        {/*        }*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div>*/}
                        {/*    {*/}
                        {/*        (user._id === currentUser._id) &&*/}
                        {/*        <>*/}
                        {/*            <h4>All your reviews</h4>*/}
                        {/*            <ReviewLargeDisplayer reviews={reviews}/>*/}
                        {/*        </>*/}
                        {/*    }*/}
                        {/*</div>*/}

                    </div>
                </div>}
        </>
    )
}


export default Users;
