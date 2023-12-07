import { useEffect, useState } from 'react';
import * as userClient from './client';
import { Link } from 'react-router-dom';

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
        <div>
            Recently added users! CHeck them out!
            {recentUsers.map((user) => (
                <div>
                    <Link key={user._id} to={`/TissueBoxd/profile/${user._id}`}>
                        {user.firstName}
                        {user.lastName}
                    </Link>
                </div>
            ))}
        </div>
    );
}
