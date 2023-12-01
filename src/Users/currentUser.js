import * as client from "./client";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLoggedInUser} from "./usersReducer";

function CurrentUser({children}) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const fetchCurrentUser = async () => {
        const user = await client.account();
        dispatch(setLoggedInUser(user));
        setLoading(false);
    };
    useEffect(() => {
        fetchCurrentUser();
    }, []);
    return <>{!loading && children}</>;
}

export default CurrentUser;
