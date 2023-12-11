import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as client from './client';
import { useSelector } from 'react-redux';
import './recentLike.css';

export default function RecentLike() {
    const [recentLike, setRecentLike] = useState([]);
    const { currentUser } = useSelector((state) => state.usersReducer);

    const fetchRecentLike = async () => {
        if (currentUser) {
            const like = await client.findUsersRecentLike(currentUser._id);
            setRecentLike(like);
        }
    };

    useEffect(() => {
        fetchRecentLike();
    }, []);

    return (
        <div className="recent-like-container">
            {currentUser && <div className="recent-like-title">Revisit Movies You've Loved!</div>}
            {currentUser && recentLike && (
                <div className="d-flex flex-wrap">
                    {recentLike.map((likes) => (
                        <div key={likes.movieId}>
                            <Link className='no-underline' to={`/TissueBoxd/movie/${likes.movieId}`}>
                                <div className="card course-card d-flex flex-column h-100">
                                    <img src={likes.poster} className="card-img-top" alt="Poster"></img>
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h4 className="card-title">{likes.movieTitle}</h4>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
