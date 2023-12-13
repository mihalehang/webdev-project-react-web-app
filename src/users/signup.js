import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as client from './client';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './reducer';
import './signup.css';

function Signup() {
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            const user = await client.signup(credentials);
            dispatch(setCurrentUser(user));
            navigate('/TissueBoxd/profile');
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div className="card">
            <div className="card-body">
                {error && <div>{error}</div>}
                <label>Username</label>
                <input
                className="signin-input"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
                <label>Password</label>
                <input
                className="signin-input"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <div>
                    <button className='btn btn-secondary' onClick={signup}>Signup</button>
                </div>
            </div>
        </div>
    );
}
export default Signup;
