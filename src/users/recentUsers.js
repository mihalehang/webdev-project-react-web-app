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
            <div className='recent-user-title'>Recently added users! Check them out!</div>
            <div className='list-group'>
                {recentUsers.map((user) => (
                    <div>
                        <Link className ='list-group-item' key={user._id} to={`/TissueBoxd/profile/${user._id}`}>
                            {user.firstName}
                            {user.lastName}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
