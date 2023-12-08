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
import * as reviewsClient from "../Reviews/client";


const Users = () => {
    const navigate = useNavigate();
    const {userId} = useParams();
    const [isOurAccount, setIsOurAccount] = useState(false);
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);

    const [following, setFollowing] = useState(false);

    const currentUser = useSelector((state) => state.usersReducer.loggedInUser);
    const isAdmin = currentUser && (currentUser.role === "ADMIN");

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
            setIsOurAccount(currentUser && (currentUser._id === user._id));

            setUser(user);
        }

        const initFollows = async () => {
            const follows = await followersClient.findFollowersOfUser(userId);
            const followers = follows.map((follows) => follows['follower']);

            if (followers) {
                setFollowing(isFollowing(followers))
            }
        }

        const initReviews = async () => {
            const reviews = await reviewsClient.findAllReviews();
            reviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
            setReviews(reviews.filter((review) => review.user._id === userId));
        }

        if (validUserId) {
            initUsers();
            initFollows();
            initReviews();
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
                                    <>
                                        {
                                            (isOurAccount || isAdmin) &&
                                            <button className={'btn cin-btn-secondary mx-1'}
                                                    onClick={() => navigate(`/users/edit/${userId}`)}>
                                                edit profile
                                            </button>
                                        }
                                        {isOurAccount &&
                                            <button className={'btn cin-btn-primary mx-1'}
                                                    onClick={handleSignOut}>
                                                sign out
                                            </button>
                                        }

                                    </>

                                    {currentUser && (
                                        !isOurAccount &&
                                        <>
                                            {(following) &&
                                                <button className={'btn cin-btn-secondary ms-2'}
                                                        onClick={handleUnfollow}>
                                                    unfollow
                                                </button>
                                            }
                                            {(!following) &&
                                                <button className={'btn cin-btn-secondary ms-2'}
                                                        onClick={handleFollow}>
                                                    follow
                                                </button>
                                            }
                                        </>
                                    )
                                    }
                                    {!currentUser &&
                                        <button className={'btn cin-btn-secondary ms-2'}
                                                onClick={() => navigate('/signin')}>
                                            sign in to follow users
                                        </button>
                                    }

                                </div>

                            </div>
                            <div className={"col-2"}>
                                {
                                    isOurAccount &&
                                    <button className={'btn cin-btn-secondary ms-2'}
                                            onClick={() => {
                                                navigate('/followers')
                                            }}>
                                        followers
                                    </button>
                                }
                            </div>
                            <div className={"col-4 d-none d-lg-block"}>
                                <h2>Following:</h2>
                                <UsersFollowing/>
                            </div>
                        </div>

                        <p>{bio}</p>

                        <div>
                            <h4>Recently watched by {username}</h4>

                            {
                                reviews.length === 0 &&
                                <p>Review some movies for them to show up here to other people!</p>
                            }
                            {
                                reviews.length > 0 &&
                                <div className={"reviewed-movies"}>
                                    {
                                        reviews.map((review, i) =>
                                            <span key={i}>
                                                <MovieReviewStub review={review}/>
                                            </span>
                                        )
                                    }
                                </div>
                            }
                        </div>

                        <div>
                            {
                                isOurAccount &&
                                <>
                                    <h4>All your reviews</h4>
                                    {
                                        reviews.length === 0 &&
                                        <p>You haven't reviewed any movies yet! When you do, you'll be able to see all
                                            of them here.</p>
                                    }
                                    {
                                        reviews.length > 0 &&
                                        <ReviewLargeDisplayer reviews={reviews}/>
                                    }
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
