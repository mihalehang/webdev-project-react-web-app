import { useSelector } from 'react-redux';
import RecentLike from '../../likes/recentLike';
import RecentUsers from '../../users/recentUsers';
import './home.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function Home() {
    const { currentUser } = useSelector((state) => state.usersReducer);
    const navigate = useNavigate();

    return (
        <div className="home-container mt-3">
            {currentUser ? (
                <div className="home-title">
                    Welcome back, <Link to={`/TissueBoxd/profile`} style={{ textDecoration: 'none' }}>{currentUser.username}</Link>!
                </div>
            ) : (
                <div className="not-logged-in-content">
                    <div className='home-title'>Welcome to TissueBoxd! </div>
                    <div className="page-description mb-3">
                        <div>Save lists of movies you've seen.</div>
                        <div>See other people's favorites.</div>
                        <div>Create a network of movie lovers!</div>
                    </div>
                    <div className="btn btn-success mb-3" onClick={() => navigate('/TissueBoxd/register/')}>
                        Get Started!
                    </div>
                </div>
            )}
            <RecentUsers />
            <RecentLike />
        </div>
    );
}
