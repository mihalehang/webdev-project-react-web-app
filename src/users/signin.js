import * as client from './client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from './reducer';
import './signin.css';
function Signin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signin = async () => {
        const user = await client.signin(credentials);
        dispatch(setCurrentUser(user));
        navigate('/TissueBoxd/home');
    };

    return (
        <div className="card">
            <div className="card-body">
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
                <button className='btn btn-success' onClick={signin}> Signin </button>
            </div>
        </div>
    );
}

export default Signin;
