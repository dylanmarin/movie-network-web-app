import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "../Users/usersReducer";


const store = configureStore({
    reducer: {
        usersReducer,
    }
});


export default store;
