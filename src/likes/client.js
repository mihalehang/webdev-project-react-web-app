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
export const createUserLikesMovie = async (userId, userName, movieId, movieTitle, poster) => {
    const response = await request.post(`${BASE_API}/users/${userId}/${userName}/likes/${movieId}/${movieTitle}`, poster);
    return response.data;
};
export const findMoviesUserLikes = async (userId) => {
    const response = await request.get(`${BASE_API}/users/${userId}/likes`);
    return response.data;
};
export const findUsersWhoLikeMovie = async (movieId) => {
    const response = await request.get(`${BASE_API}/movies/${movieId}/likes`);
    return response.data;
};

export const deleteUserLikesMovie = async (userId, movieId) => {
    const response = await request.delete(`${BASE_API}/users/${userId}/likes/${movieId}`);
    return response.data;
}

export const findUsersRecentLike = async (userId) => {
    const response = await request.get(`${BASE_API}/users/${userId}/likes/recent`);
    return response.data;
}