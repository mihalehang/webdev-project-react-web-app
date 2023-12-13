import { useEffect, useState } from 'react';
import * as userClient from './client';
import { Link } from 'react-router-dom';
import './recentUsers.css';

export default function RecentUsers() {
    const [recentUsers, setRecentUsers] = useState([]);

    const fetchRecentUsers = async () => {
        const users = await userClient.findRecentUserAdded();
        if (users) {
            setRecentUsers(users);
        }
    };

    useEffect(() => {
        fetchRecentUsers();
    }, []);

    return (
        <div className="recent-user-container">
            <div className='recent-user-title'>Recently Added Users! Check Them Out!</div>
            <div className='list-group'>
                {recentUsers.map((user) => (
                    <div key={user._id}>
                        <Link className ='list-group-item' to={`/TissueBoxd/profile/${user._id}`}>
                            {user.firstName} {user.lastName} (@{user.username})
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
