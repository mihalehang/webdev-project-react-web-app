import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
function Nav() {
    const { pathname } = useLocation();
    const { currentUser } = useSelector((state) => state.usersReducer);
    return (
        <nav className="nav nav-tabs mt-2">
            <Link to="/TissueBoxd/home" className={`nav-link ${pathname.includes('home') ? 'active' : ''}`}>
                Home
            </Link>
            <Link to="/TissueBoxd/search" className={`nav-link ${pathname.includes('search') ? 'active' : ''}`}>
                Search
            </Link>
            {!currentUser && (
                <>
                    <Link to="/TissueBoxd/login" className={`nav-link ${pathname.includes('login') ? 'active' : ''}`}>
                        Login
                    </Link>
                    <Link
                        to="/TissueBoxd/register"
                        className={`nav-link ${pathname.includes('register') ? 'active' : ''}`}
                    >
                        Register
                    </Link>
                </>
            )}
            {currentUser && (
                <>
                    <Link
                        to="/TissueBoxd/profile"
                        className={`nav-link ${pathname.includes('profile') ? 'active' : ''}`}
                    >
                        Profile
                    </Link>
                    {currentUser.role === 'ADMIN' && (
                        <Link to="/TissueBoxd/users" className={`nav-link ${pathname.includes('users') ? 'active' : ''}`}>
                            Users
                        </Link>
                    )}
                </>
            )}
        </nav>
    );
}
export default Nav;
