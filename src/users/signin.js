import * as client from './client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from "./reducer";

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
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
            </div>
            <div>
                <button onClick={signin}> Signin </button>
            </div>
        </div>
    );
}

export default Signin;
