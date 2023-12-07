import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as client from './client';
import { useSelector } from 'react-redux';

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
        <div>
            Most recent like:
            {currentUser &&
                recentLike.map((like) => (
                    <div>
                        <Link key={like.movieId} to={`/TissueBoxd/movie/${like.movieId}`}>
                            {like.movieTitle}
                        </Link>
                    </div>
                ))}
        </div>
    );
}
