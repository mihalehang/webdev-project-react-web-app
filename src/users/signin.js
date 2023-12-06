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
        navigate('/TissueBoxd/profile');
    };
    return (
        <div>
            <h1>Signin</h1>
            <input
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <input
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button onClick={signin}> Signin </button>
        </div>
    );
}
export default Signin;
