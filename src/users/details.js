import * as client from './client';
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import * as followsClient from '../follows/client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as likesClient from '../likes/client';
import './details.css';

function UserDetails() {
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [liked, setLiked] = useState([]);
    const [clicked, setClicked] = useState(false);
    const { currentUser } = useSelector((state) => state.usersReducer);
    const navigate = useNavigate();

    const { id } = useParams();

    const fetchUser = async () => {
        const user = await client.findUserById(id);
        setUser(user);
        fetchFollowers(user._id);
        fetchFollowing(user._id);
        fetchMoviesLiked(user._id);
    };

    const follow = async () => {
        if (currentUser) {
            await followsClient.createUserFollowsUser(currentUser._id, user._id);
            setClicked(true);
        } else {
            navigate('/TissueBoxd/login/');
        }
    };

    const unfollow = async () => {
        await followsClient.deleteUserFollowsUser(currentUser._id, user._id);
        setClicked(true);
    };

    const fetchFollowers = async (userId) => {
        const followers = await followsClient.findUsersFollowingUser(userId);
        setFollowers(followers);
    };

    const fetchFollowing = async (userId) => {
        const following = await followsClient.findUsersFollowedByUser(userId);
        setFollowing(following);
    };

    const alreadyFollowing = () => {
        if (currentUser) {
            return followers.find((follows) => follows.follower._id === currentUser._id);
        }
    };

    const fetchMoviesLiked = async (userId) => {
        const moviesLiked = await likesClient.findMoviesUserLikes(userId);
        setLiked(moviesLiked);
    };

    useEffect(() => {
        fetchUser();
    }, [id]);
    return (
        <div className="profile-container mt-3">
            <h1>User Details</h1>
            <div className="profile-network-container">
                <div className="card user-profile-card">
                    <div className="card-body">
                        <h3 className="card-title" style={{ textAlign: 'center' }}>
                            {user?.username}'s Profile
                        </h3>
                        <div>
                            {currentUser?.role === 'ADMIN' && (
                                <>
                                    <div>Username: {user?.username}</div>
                                    <div>
                                        Name: {user?.firstName} {user?.lastName}
                                    </div>
                                    <div>Email: {user?.email}</div>
                                    <div>Role: {user?.role}</div>
                                    <div>Number of Liked Movies: {liked.length}</div>
                                </>
                            )}
                            {currentUser?.role !== 'ADMIN' && (
                                <>
                                    <div>Username: {user?.username}</div>
                                    <div>
                                        Name: {user?.firstName} {user?.lastName}
                                    </div>
                                    <div>Number of Liked Movies: {liked.length}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card user-network-card mx-3">
                    <div className="card-body">
                        <h3 className="card-title" style={{ textAlign: 'center' }}>
                            Network
                        </h3>
                        <div className="network-group">
                            <div className="following-group">
                                <div className="network-title">Following</div>
                                <div className="list-group">
                                    {following.length === 0 && (
                                        <div>
                                            Looks like <span style={{ fontWeight: 'bold' }}>{user?.username}</span>{' '}
                                            isn't following anyone.
                                        </div>
                                    )}
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
                                <div className="network-title">Followers</div>
                                <div className="list-group">
                                    {followers.length === 0 && (
                                        <div>
                                            {' '}
                                            Looks like no one is following{' '}
                                            <span style={{ fontWeight: 'bold' }}>{user?.username}</span>.
                                        </div>
                                    )}

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
                    </div>
                </div>
            </div>

            <div className="liked-group my-3">
                <h2>Likes</h2>
                {liked.length === 0 && (
                    <div>
                        {' '}
                        <span style={{ fontWeight: 'bold' }}>{user?.username}</span> has no liked movies.
                    </div>
                )}
                <div className="d-flex flex-wrap">
                    {liked &&
                        liked.map((likes) => (
                            <div key={likes.movieId}>
                                <Link className="no-underline" to={`/TissueBoxd/movie/${likes.movieId}`}>
                                    <div className="card course-card d-flex flex-column h-100 mx-3">
                                        <img src={likes.poster} className="card-img-top" alt="Poster"></img>
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <h4 className="card-title">{likes.movieTitle}</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>

            <div className="my-3">
                {currentUser?._id !== id && (
                    <>
                        {alreadyFollowing() ? (
                            <button onClick={unfollow} disabled={clicked} className="btn btn-danger">
                                Unfollow
                            </button>
                        ) : (
                            <button onClick={follow} disabled={clicked} className="btn btn-primary">
                                Follow
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default UserDetails;
