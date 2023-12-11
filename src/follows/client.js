import axios from 'axios';
const request = axios.create({
    withCredentials: true,
});

// const BASE_API = 'http://localhost:4000/api';
export const BASE_API = process.env.REACT_APP_API_BASE;
export const FOLLOWS_API = `${BASE_API}/follows`;

export const findAllFollows = async () => {
    const response = await request.get(`${FOLLOWS_API}`);
    return response.data;
};
export const createUserFollowsUser = async (followerId, followedId) => {
    const response = await request.post(`${BASE_API}/users/${followerId}/follows/${followedId}`);
    return response.data;
};
export const deleteUserFollowsUser = async (followerId, followedId) => {
    const response = await request.delete(`${BASE_API}/users/${followerId}/follows/${followedId}`);
    return response.data;
};
export const findUsersFollowedByUser = async (userId) => {
    const response = await request.get(`${BASE_API}/users/${userId}/following`);
    return response.data;
};
export const findUsersFollowingUser = async (userId) => {
    const response = await request.get(`${BASE_API}/users/${userId}/followers`);
    return response.data;
};
