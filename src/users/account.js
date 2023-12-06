import * as client from './client';
import * as followsClient from '../follows/client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCurrentUser } from './reducer';
function Account() {
    const [account, setAccount] = useState(null);
    const [following, setFollowing] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchAccount = async () => {
        const user = await client.account();
        if (user) {
            setAccount(user);
            fetchFollowing(user._id);
        }
    };

    const save = async () => {
        await client.updateUser(account);
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate('/TissueBoxd/login');
    };

    const fetchFollowing = async (userId) => {
        const following = await followsClient.findUsersFollowedByUser(userId);
        setFollowing(following);
    };

    useEffect(() => {
        fetchAccount();
    }, []);

    return (
        <div className="w-50">
            {account && (
                <div>
                    <div>
                        Password:
                        <input
                            value={account.password}
                            onChange={(e) => setAccount({ ...account, password: e.target.value })}
                        />
                    </div>
                    <div>
                        First Name:
                        <input
                            value={account.firstName}
                            onChange={(e) => setAccount({ ...account, firstName: e.target.value })}
                        />
                    </div>
                    <div>
                        LastName:
                        <input
                            value={account.lastName}
                            onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
                        />
                    </div>
                    <div>
                        Dob:
                        <input value={account.dob} onChange={(e) => setAccount({ ...account, dob: e.target.value })} />
                    </div>
                    <div>
                        Email:
                        <input
                            value={account.email}
                            onChange={(e) => setAccount({ ...account, email: e.target.value })}
                        />
                    </div>
                    <div>
                        ROLE:
                        <select onChange={(e) => setAccount({ ...account, role: e.target.value })}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </select>
                    </div>

                    <button onClick={save}>Save</button>
                    <button onClick={signout}>Signout</button>

                    {account.role === 'ADMIN' && (
                        <Link to="/TissueBoxd/users" className="btn btn-warning w-100">
                            Users
                        </Link>
                    )}
                    
                    <h2>Following</h2>
                    <div className="list-group">
                        {following.map((follows) => (
                            <Link
                                key={follows.followed._id}
                                className="list-group-item"
                                to={`/TissueBoxd/profile/${follows.followed._id}`}
                            >
                                {follows.followed.firstName} {follows.followed.lastName} (@
                                {follows.followed.username})
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
export default Account;
