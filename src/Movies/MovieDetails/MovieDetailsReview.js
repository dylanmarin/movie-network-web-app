import {useEffect, useState} from "react";
import db from "../../Database"
import {Link} from "react-router-dom";
import "./index.css"
const MovieDetailsReview = ({review}) => {
    const {id, userId, movieId, rating, reviewText} = review;

    const [user, setUser] = useState({});

    useEffect(() => {
        const user = db.users.find((user) => user._id === userId)
        setUser(user);
    }, []);


    return (
        <li className={"list-group-item"}>
            <div className={"review-heading"}>
                <Link to={`/users/${user._id}`}>{user.username}</Link> rated this movie {rating} stars.
            </div>
            <p className={"review-body"}>
                {reviewText}
            </p>
        </li>
    )
}


export default MovieDetailsReview;
