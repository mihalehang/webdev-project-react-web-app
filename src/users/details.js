import * as client from './client';
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import * as followsClient from '../follows/client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserDetails() {
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [clicked, setClicked] = useState(false);
    const { currentUser } = useSelector((state) => state.usersReducer);
    const navigate = useNavigate();

    const { id } = useParams();

    const fetchUser = async () => {
        const user = await client.findUserById(id);
        setUser(user);
        fetchFollowers(user._id);
        fetchFollowing(user._id);
    };

    const follow = async () => {
        if (currentUser) {
            await followsClient.createUserFollowsUser(currentUser._id, user._id);
            setClicked(true);
        } else {
            navigate("/TissueBoxd/login/");
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

    useEffect(() => {
        fetchUser();
    }, [id]);
    return (
        <div className="container">
            {currentUser?._id !== id && (
                <>
                    {alreadyFollowing() ? (
                        <button onClick={unfollow} disabled={clicked} className="btn btn-danger float-end">
                            Unfollow
                        </button>
                    ) : (
                        <button onClick={follow} disabled={clicked} className="btn btn-primary float-end">
                            Follow
                        </button>
                    )}
                </>
            )}
            <h1>User Details</h1>
           
            
             {currentUser?.role === 'ADMIN' && (
            <>
                <div>Username: {user?.username}</div>
                <div>First Name: {user?.firstName}</div>
                <div>Last Name: {user?.lastName}</div>
                <div>Email: {user?.email}</div>
                        <div>Role: {user?.role}</div>
            </>
        )}
        {currentUser?.role === 'USER' && (
                    <>
                        {}
                        <div>Username: {user?.username}</div>
                <div>First Name: {user?.firstName}</div>
                <div>Last Name: {user?.lastName}</div>
                    </>
                )}
            <h2>Followers</h2>
            <div className="list-group">
                {followers.map((follows) => (
                    <Link to={`/users/${follows.follower._id}`} key={follows._id} className="list-group-item">
                        {follows.follower.firstName} {follows.follower.lastName} (@
                        {follows.follower.username})
                    </Link>
                ))}
            </div>
            <h2>Following</h2>
            <div className="list-group">
                {following.map((follows) => (
                    <Link to={`/users/${follows.followed._id}`} key={follows._id} className="list-group-item">
                        {follows.followed.firstName} {follows.followed.lastName} (@
                        {follows.followed.username})
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default UserDetails;
