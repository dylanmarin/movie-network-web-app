import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loggedInUser: null,
    signedIn: false,
};

const usersSlice = createSlice({
        name: "users",
        initialState,
        reducers: {
            signedIn: (state) => !!state.loggedInUser,
            setLoggedInUser: (state, action) => {
                state.loggedInUser = action.payload;
                state.signedIn = true;
            },
            logout: (state) => {
                state.loggedInUser = null;
                state.signedIn = false;
            }
        },
    })
;


export const {
    setLoggedInUser, logout
} = usersSlice.actions;
export default usersSlice.reducer;
