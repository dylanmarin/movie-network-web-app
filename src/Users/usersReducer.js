import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loggedInUser: {}
};

const usersSlice = createSlice({
        name: "users",
        initialState,
        reducers: {
            setLoggedInUser: (state, action) => {
                state.loggedInUser = action.payload;
            },
        },
    })
;


export const {
    setLoggedInUser
} = usersSlice.actions;
export default usersSlice.reducer;
