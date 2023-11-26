import {useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../Database"
import MovieReviewStub from "./MovieReviewStub";
import "./index.css"
import UsersFollowing from "./UsersFollowing";
import {FaCircleUser} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import ReviewLargeDisplayer from "../Reviews/ReviewLargeDisplayer";


const Users = () => {
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const [currentUserId, setCurrentUserId] = useState(1);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        const user = db.users.find((user) => user._id === parseInt(userId))
        setUser(user);

        setFollowing(Object.keys(user.following).includes(currentUserId.toString()))

        const reviews = db.reviews.filter((review) => review.userId === parseInt(userId))
        setReviews(reviews);
    }, [userId]);

    const {username, bio, photoURL} = user;

    const handleSignOut = () => {
        navigate(`/signin`);
    }

    const handleFollow = () => {
        setFollowing(true);
    }

    const handleUnfollow = () => {
        setFollowing(false);
    }

    return (
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
                                (user._id === currentUserId) &&
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
                                (user._id !== currentUserId) &&
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
                            (user._id === currentUserId) &&
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
                        (user._id === currentUserId) &&
                        <>
                            <h4>All your reviews</h4>
                            <ReviewLargeDisplayer reviews={reviews}/>
                        </>
                    }
                </div>

            </div>
        </div>
    )
}


export default Users;
