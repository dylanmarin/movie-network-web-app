import {useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../Database"
import MovieReviewStub from "./MovieReviewStub";
import "./index.css"
import UsersFollowing from "./UsersFollowing";
import {FaCircleUser} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";


const Users = () => {
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const user = db.users.find((user) => user._id === parseInt(userId))
        setUser(user);

        const reviews = db.reviews.filter((review) => review.userId === parseInt(userId))
        setReviews(reviews);
    }, [userId]);

    const {username, bio, photoURL} = user;

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
                            <button className={'btn btn-secondary edit-profile-button'}
                                    onClick={() => navigate(`/users/edit/${userId}`)}>
                                edit profile
                            </button>
                        </div>

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


            </div>
        </div>
    )
}


export default Users;
