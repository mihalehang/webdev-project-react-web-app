import React, { useState, useEffect } from 'react';
import * as client from './client';
import { BsFillCheckCircleFill, BsPencil, BsPlusCircleFill, BsTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
function UserTable() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: '', password: '', role: 'USER' });
    const [showPassword, setShowPassword] = useState(false);
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
            setUser({ username: '', password: '', role: 'USER' });
            setShowPassword(false);
        } catch (err) {
            console.log(err);
        }
    };

    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
            setShowPassword(false);
        } catch (err) {
            console.log(err);
        }
    };

    const updateUser = async () => {
        try {
            await client.updateUser(user);
            fetchUsers();
            setShowPassword(false);            
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            fetchUsers();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div className="row">
                <div className="col-md-4">
                    <h2>Edit User Details</h2>
                    <form>
                       
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">
                                Role
                            </label>
                            <select
                                className="form-select"
                                id="role"
                                value={user.role}
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>

                        </div>

                        
                    {showPassword ? (
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                    ) : (
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                    )}
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label className="form-check-label" htmlFor="showPassword">
                            Show Password
                        </label>
                    </div>

                        <button type="button" className="btn btn-primary" onClick={updateUser}>
                            <BsFillCheckCircleFill /> Update User
                        </button>
                    </form>
                </div>
                <div className="col-md-8">
                    <h2>User List</h2>
                    <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                    <tr>
                                               
                    </tr>
                </thead>
                <tbody>
                
                    {users.map((user) => (
                        <tr key={user._id}>
                            <Link to={`/TissueBoxd/profile/${user._id}`}>
                                <td>{user.username}</td>
                    
                            </Link>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => deleteUser(user)}>
                                    <BsTrash3Fill />
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-warning me-2">
                                    <BsPencil onClick={() => selectUser(user)} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                    </table>
                </div>
            </div>
    );
}
export default UserTable;
