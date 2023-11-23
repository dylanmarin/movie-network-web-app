import React from 'react';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Home from "./Home";
import Movies from "./Movies";
import NavigationBar from "./NavigationBar";
import "./shared.css"
import '@popperjs/core/lib/popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js'
import MovieDetails from "./Movies/MovieDetails";
import Users from "./Users";
import "./index.css"
import "react-icons"
import EditUsers from "./Users/Edit";

function App() {
    return (
        <HashRouter>
            <div className={"h-100"}>
                <NavigationBar/>
                <div className={"main-content"}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home"/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/users/:userId" element={<Users/>}/>
                        <Route path="/users/edit/:userId" element={<EditUsers/>}/>
                        <Route path="/movies" element={<Movies/>}/>
                        <Route path="/movies/:movieId" element={<MovieDetails/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
