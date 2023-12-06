import { Link, useLocation } from "react-router-dom";
function Nav() {
    const { pathname } = useLocation();
    return (
        <nav className="nav nav-tabs mt-2">
            <Link to="/TissueBoxd/home" className={`nav-link ${pathname.includes("home") ? "active" : ""}`}>
                Home
            </Link>
            <Link to="/TissueBoxd/login" className={`nav-link ${pathname.includes("login") ? "active" : ""}`}>
                Login
            </Link>
            <Link to="/TissueBoxd/register" className={`nav-link ${pathname.includes("register") ? "active" : ""}`}>
                Register
            </Link>
            <Link to="/TissueBoxd/profile" className={`nav-link ${pathname.includes("profile") ? "active" : ""}`}>
                Profile
            </Link>
            <Link to="/TissueBoxd/search" className={`nav-link ${pathname.includes("search") ? "active" : ""}`}>
                Search
            </Link>
        </nav>
    );
}
export default Nav;
