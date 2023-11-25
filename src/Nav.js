import { Link, useLocation } from "react-router-dom";
function Nav() {
    const { pathname } = useLocation();
    return (
        <nav className="nav nav-tabs mt-2">
            <Link to="/home" className={`nav-link ${pathname.includes("home") ? "active" : ""}`}>
                Home
            </Link>
            <Link to="/login" className={`nav-link ${pathname.includes("login") ? "active" : ""}`}>
                Login
            </Link>
            <Link to="/register" className={`nav-link ${pathname.includes("register") ? "active" : ""}`}>
                Register
            </Link>
            <Link to="/profile" className={`nav-link ${pathname.includes("profile") ? "active" : ""}`}>
                Profile
            </Link>
            <Link to="/search" className={`nav-link ${pathname.includes("search") ? "active" : ""}`}>
                Search
            </Link>
            <Link to="/details" className={`nav-link ${pathname.includes("details") ? "active" : ""}`}>
                Details
            </Link>
        </nav>
    );
}
export default Nav;
