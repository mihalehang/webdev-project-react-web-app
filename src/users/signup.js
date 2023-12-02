import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate("/profile");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div>
            <h1>Signup</h1>
            {error && <div>{error}</div>}
            <h3>Username:</h3> 
            <input
                value={credentials.username}
                onChange={(e) =>
                    setCredentials({
                        ...credentials,
                        username: e.target.value,
                    })
                }
            />
            <h3>Password: </h3>
            <input
                value={credentials.password}
                onChange={(e) =>
                    setCredentials({
                        ...credentials,
                        password: e.target.value,
                    })
                }
            />
            <button onClick={signup}>Signup</button>
        </div>
    );
}
export default Signup;
