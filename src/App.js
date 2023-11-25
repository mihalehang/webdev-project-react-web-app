import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/index.js"; 
import Login from "./pages/login/index.js";
import Profile from "./pages/profile/index.js";
import Register from "./pages/register/index.js";
import Search from "./pages/search/index.js";
import Details from "./pages/details/index.js";

function App() {
    return (
        <HashRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/details" element={<Details />} />
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
