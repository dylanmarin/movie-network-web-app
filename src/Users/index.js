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
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./usersReducer";


const Users = () => {
    const navigate = useNavigate();
    const {userId} = useParams();

    const loggedInUser = useSelector((state) => state.usersReducer.loggedInUser);

    const [currentUser, setCurrentUser] = useState({});
    const [isOurAccount, setIsOurAccount] = useState(false);
    const [user, setUser] = useState({});
    const [following, setFollowing] = useState(false);
    const [reviews, setReviews] = useState([]);


    useEffect(() => {

        const initUsers = async () => {
            const currentUser = await usersClient.account();
            const user = await usersClient.findUserById(userId);

            setCurrentUser(currentUser);
            setUser(user);

            setIsOurAccount(currentUser._id === user._id);
            setFollowing(currentUser.following.includes(user._id));
        }

        initUsers();


    }, [userId]);

    const {username, bio, photoURL} = user;
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        await usersClient.signout();
        dispatch(logout());
        navigate(`/signin`);
    }

    const handleFollow = () => {
        setFollowing(true);
        usersClient.updateUser(currentUser._id, {
            ...currentUser,
            following: [...currentUser.following, user._id]
        })
    }

    const handleUnfollow = () => {
        setFollowing(false);

        usersClient.updateUser(currentUser._id, {
            ...currentUser,
            following: currentUser.following.filter((id) => id !== user._id)
        })
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
                                        isOurAccount &&
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
                                        !isOurAccount &&
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
                            <div className={"col-2"}>
                                {
                                    isOurAccount &&
                                    <button className={'btn btn-secondary edit-profile-button ms-2'}
                                            onClick={() => {
                                                navigate('/followers')
                                            }}>
                                        followers
                                    </button>
                                }
                            </div>
                            <div className={"col-4"}>
                                <h2>Following:</h2>
                                <UsersFollowing/>
                            </div>
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
                        {/*        isOurAccount &&*/}
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
