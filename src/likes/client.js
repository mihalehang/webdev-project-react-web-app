import axios from 'axios';
const request = axios.create({
    withCredentials: true,
});

const BASE_API = 'http://localhost:4000/api';
export const LIKES_API = `${BASE_API}/likes`;


export const findAllLikes = async () => {
    const response = await request.get(`${LIKES_API}`);
    return response.data;
};
export const createUserLikesMovie = (userId, albumId) => {
    const response = request.post(`${BASE_API}/users/${userId}/likes/${albumId}`);
    return response.data;
};
export const findMoviesUserLikes = (userId) => {
    const response = request.get(`${BASE_API}/users/${userId}/likes`);
    return response.data;
};
export const findUsersWhoLikeMovie = (albumId) => {
    const response = request.get(`${BASE_API}/albums/${albumId}/likes`);
    return response.data;
};
