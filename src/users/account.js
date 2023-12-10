import * as client from './client';
import * as followsClient from '../follows/client';
import * as likesClient from '../likes/client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCurrentUser } from './reducer';
import './account.css';

function Account() {
    const [account, setAccount] = useState(null);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [liked, setLiked] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.usersReducer);

    const fetchAccount = async () => {
        const user = await client.account();
        if (user) {
            setAccount(user);
            fetchFollowing(user._id);
            fetchFollowers(user._id);
            fetchMoviesLiked(user._id);
        }
    };

    const save = async () => {
        await client.updateCurrentUser(account);
        dispatch(setCurrentUser(account));
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate('/TissueBoxd/home');
    };

    const fetchFollowing = async (userId) => {
        const following = await followsClient.findUsersFollowedByUser(userId);
        setFollowing(following);
    };

    const fetchFollowers = async (userId) => {
        const followers = await followsClient.findUsersFollowingUser(userId);
        setFollowers(followers);
    };

    const fetchMoviesLiked = async (userId) => {
        const moviesLiked = await likesClient.findMoviesUserLikes(userId);
        setLiked(moviesLiked);
    };

    useEffect(() => {
        fetchAccount();
    }, []);

    return (
        <div className="profile-container d-flex flex-wrap">
            {account && (
                <div>
                    <div className="update-form card">
                        <div className="card-body">
                            <h5 class="card-title">Update Profile</h5>

                            <div className="name-input my-3">
                                <div>
                                    <div>First Name:</div>
                                    <input
                                        id="firstName"
                                        value={account.firstName}
                                        onChange={(e) => setAccount({ ...account, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="lastname-input">
                                    <div>Last Name:</div>
                                    <input
                                        id="lastName"
                                        value={account.lastName}
                                        onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="my-3">
                                <div>Password:</div>
                                <input
                                    id="password"
                                    value={account.password}
                                    onChange={(e) => setAccount({ ...account, password: e.target.value })}
                                />
                            </div>
                            <div className="my-3">
                                <div>Birth Date:</div>
                                <input
                                    id="dob"
                                    type="date"
                                    value={account.dob}
                                    onChange={(e) => setAccount({ ...account, dob: e.target.value })}
                                />
                            </div>
                            <div className="my-3">
                                <div>Email:</div>
                                <input
                                    id="email"
                                    value={account.email}
                                    onChange={(e) => setAccount({ ...account, email: e.target.value })}
                                />
                            </div>
                            <div className="my-3">
                                <div>User Role:</div>
                                <select onChange={(e) => setAccount({ ...account, role: e.target.value })}>
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>

                            <button className="btn btn-success" onClick={save}>
                                Save
                            </button>
                        </div>
                    </div>
                    
                    <div className="network-group my-3">
                        
                        <div className="following-group">
                            <h2>Following</h2>
                            <div className="list-group">
                                {following.length === 0 && <div> Looks like you're not following anyone... yet!</div>}
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

                        <div className="followers-group">
                            <h2>Followers</h2>
                            <div className="list-group">
                                {followers.length === 0 && <div> Looks like no one is following you ... yet!</div>}

                                {followers.map((follows) => (
                                    <Link
                                        key={follows.follower._id}
                                        className="list-group-item"
                                        to={`/TissueBoxd/profile/${follows.follower._id}`}
                                    >
                                        {follows.follower.firstName} {follows.follower.lastName} (@
                                        {follows.follower.username})
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="liked-group my-3">
                        <h2>Likes</h2>
                        <div className="list-group">
                            {liked.map((likes) => (
                                <div>
                                    <Link
                                        key={likes.movieId}
                                        className="list-group-item"
                                        to={`/TissueBoxd/movie/${likes.movieId}`}
                                    >
                                        {likes.movieTitle}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-danger" onClick={signout}>
                        Signout
                    </button>
                </div>
            )}
        </div>
    );
}
export default Account;
