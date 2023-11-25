import {useEffect, useState} from "react";
import db from "../../Database"
import {Link} from "react-router-dom";
import "./index.css"
import StarRating from "../../StarRating";
import {MdOutlineNotes} from "react-icons/md";

const MovieDetailsReview = ({review}) => {
    const {id, userId, movieId, rating, reviewText} = review;

    const [user, setUser] = useState({});

    useEffect(() => {
        const user = db.users.find((user) => user._id === userId)
        setUser(user);
    }, []);


    return (
        <>
            <Link to={`/users/${user._id}`}>
                <div className={"ps-3 my-2"}>
                    <div className={"review-heading"}>
                        {user.username}
                    </div>
                    <div className={"fs-4 my-0 d-inline icon-row"}>
                        <StarRating rating={rating}/>
                        <MdOutlineNotes/>
                    </div>
                </div>
            </Link>
        </>
    )
}


export default MovieDetailsReview;
