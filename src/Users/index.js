import {useParams} from "react-router";
import {useEffect, useState} from "react";
import MovieReviewStub from "./MovieReviewStub";
import "./index.css"
import UsersFollowing from "./UsersFollowing";
import {FaCircleUser} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import ReviewLargeDisplayer from "../Reviews/ReviewLargeDisplayer";
import * as usersClient from "./client.js";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./usersReducer";
import * as followersClient from "../Followers/client";


const Users = () => {
    const navigate = useNavigate();
    const {userId} = useParams();
    const [isOurAccount, setIsOurAccount] = useState(false);
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);

    const [following, setFollowing] = useState(false);

    const currentUser = useSelector((state) => state.usersReducer.loggedInUser);


    const isFollowing = (followers) => {
        if (currentUser) {
            return followers.some((follower) => follower._id === currentUser._id);
        }
        return false;
    }

    const validUserId = userId.length === 24;


    useEffect(() => {
        const initUsers = async () => {
            const user = await usersClient.findUserById(userId);
            if (!user._id) {
                navigate("/home");
            }
            setUser(user);

            setIsOurAccount(currentUser && (currentUser._id === user._id));
        }

        const initFollows = async () => {
            const follows = await followersClient.findFollowersOfUser(userId);
            const followers = follows.map((follows) => follows['follower']);

            if (followers) {
                setFollowing(isFollowing(followers))
            }
        }

        if (validUserId) {
            initUsers();
            initFollows();
        } else {
            navigate("/home");
        }
    }, [userId, following]);

    const {username, bio, photoURL} = user;
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        await usersClient.signout();
        dispatch(logout());
        navigate(`/signin`);
    }

    const handleFollow = async () => {
        const follow = await followersClient.userFollowsUser(user._id);

        if (follow) {
            setFollowing(true);
        }

    }

    const handleUnfollow = async () => {
        const status = await followersClient.userUnfollowsUser(user._id);

        if (status.deletedCount > 0) {
            setFollowing(false);
        }
    }

    return (
        <>
            {user._id && validUserId &&
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
                                    {currentUser && (
                                        !isOurAccount &&
                                        <>
                                            {(following) &&
                                                <button className={'btn btn-secondary edit-profile-button'}
                                                        onClick={handleUnfollow}>
                                                    unfollow
                                                </button>
                                            }
                                            {(!following) &&
                                                <button className={'btn btn-secondary edit-profile-button ms-2'}
                                                        onClick={handleFollow}>
                                                    follow
                                                </button>
                                            }
                                        </>
                                    )
                                    }
                                    {!currentUser &&
                                        <button className={'btn btn-secondary edit-profile-button ms-2'}
                                                disabled={true}>
                                            sign in to follow users
                                        </button>
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

                        <div>
                            <h4>Recently watched by {username}</h4>
                            <div className={"reviewed-movies"}>
                                {
                                    reviews.map((review) =>
                                        <>
                                            <MovieReviewStub review={review}/>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            {
                                isOurAccount &&
                                <>
                                    <h4>All your reviews</h4>
                                    <ReviewLargeDisplayer reviews={reviews}/>
                                </>
                            }
                        </div>

                    </div>
                </div>
            }
        </>
    )
}


export default Users;
