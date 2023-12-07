import React from 'react';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Home from "./Home";
import NavigationBar from "./NavigationBar";
import "./shared.css"
import MovieDetails from "./Movies";
import Users from "./Users";
import "./index.css"
import "react-icons"
import EditUsers from "./Users/Edit";
import Search from "./Search";
import Reviews from "./Reviews";
import NewReview from "./Reviews/NewReview";
import SignIn from "./SignIn";
import Followers from "./Followers";
import {Provider} from "react-redux";
import store from "./store";
import CurrentUser from "./Users/currentUser";
import Admin from "./Admin";

function App() {
    return (
        <Provider store={store}>
            <CurrentUser>
                <HashRouter>
                    <div className={"h-100"}>
                        <NavigationBar/>
                        <div className={"main-content"}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/home"/>}/>
                                <Route path="/home" element={<Home/>}/>
                                <Route path="/users/:userId" element={<Users/>}/>
                                <Route path="/users/edit/:userId" element={<EditUsers/>}/>
                                <Route path="/movies/:movieId" element={<MovieDetails/>}/>
                                <Route path={"/movies/:movieId/review"} element={<NewReview/>}/>
                                <Route path={"/reviews/:reviewId"} element={<Reviews editting={false}/>}/>
                                <Route path={"/reviews/:reviewId/edit"} element={<Reviews editting={true}/>}/>
                                <Route path={"/search"} element={<Search/>}/>
                                <Route path={"/search/:searchText"} element={<Search/>}/>
                                <Route path={"/signin"} element={<SignIn/>}/>
                                <Route path={"/followers"} element={<Followers/>}/>
                                <Route path={"/admin"} element={<Admin/>}/>
                            </Routes>
                        </div>
                    </div>
                </HashRouter>
            </CurrentUser>
        </Provider>
    );
}

export default App;
