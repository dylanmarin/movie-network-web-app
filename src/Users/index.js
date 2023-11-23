import {useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../Database"
import MovieReviewStub from "./MovieReviewStub";
import "./index.css"
import UsersFollowing from "./UsersFollowing";

const Users = () => {
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const user = db.users.find((user) => user._id === parseInt(userId))
        setUser(user);

        const reviews = db.reviews.filter((review) => review.userId === parseInt(userId))
        setReviews(reviews);
    }, [userId]);

    const {username, bio} = user;

    return (
        <div>
            <div className={""}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h1>{username}</h1>
                        <div className={"row"}>
                            <div className={"col-4"}>
                                <img src={""} alt={"profile-photo"}
                                     className={"profile-photo"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"col-4"}>
                        <h2>Following:</h2>
                        <UsersFollowing/>
                    </div>
                </div>

                <div>
                    <h5 className={"mt-2"}>Bio:</h5>
                    <p>{bio}</p>
                </div>

                <div>
                    <h4>Movies {username} has reviewed:</h4>
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
