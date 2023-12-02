import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/index.js"; 
import Login from "./pages/login/index.js";
import Profile from "./pages/profile/index.js";
import Register from "./pages/register/index.js";
import Search from "./pages/search/index.js";
import Details from "./pages/details/index.js";
import Nav from "./Nav.js";
import MovieDetails from "./movies/movie-result.js";
import UserTable from "./users/table.js";
import UserDetails from "./users/details.js";

function App() {
    return (
        <HashRouter>
            <Nav/>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/search/:id" element={<MovieDetails />} />
                    <Route path="/details" element={<Details />} />
                    <Route path="/users" element={<UserTable/>} />
                    <Route path="/users/:id" element={<UserDetails/>} />
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
