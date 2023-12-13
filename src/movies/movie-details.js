import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as client from './movie-service';
import * as likesClient from '../likes/client';
import * as userService from '../users/client';
import { useState } from 'react';
import ProtectedContent from '../users/protectedContent';
function MovieDetails() {
    const [movie, setMovie] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [likes, setLikes] = useState([]);
    const { id } = useParams();

    const fetchMovie = async (id) => {
        const result = await client.imdbIDSearch(id);
        setMovie(result.data);
        fetchLikes();
    };

    const like = async () => {
        if (movie) {
            await likesClient.createUserLikesMovie(
                currentUser._id,
                currentUser.firstName + ' ' + currentUser.lastName,
                id,
                movie.Title,
                {poster: movie.Poster},
            );
            setClicked(true);
        }
    };

    const unlike = async () => {
        if (movie) {
            await likesClient.deleteUserLikesMovie(currentUser._id, id);
            setClicked(true);
        }
    };

    const fetchLikes = async () => {
        const likes = await likesClient.findUsersWhoLikeMovie(id);
        setLikes(likes);
    };

    const fetchCurrentUser = async () => {
        const user = await userService.account();
        setCurrentUser(user);
    };

    const alreadyLiked = () => {
        return likes.find((likes) => likes.user === currentUser._id);
    };

    useEffect(() => {
        fetchMovie(id);
        fetchCurrentUser();
    }, [id]);

    return (
        <div>
            <ProtectedContent>
                {!alreadyLiked() ? (
                    <button onClick={like} disabled={clicked} className="btn btn-primary float-end">
                        Like
                    </button>
                ) : (
                    <div>
                        <button onClick={unlike} disabled={clicked} className="btn btn-danger float-end">
                            Unlike
                        </button>
                    </div>
                )}
            </ProtectedContent>
            <h1>{movie && movie.Title}</h1>
            <div>{movie && <>{JSON.stringify(movie)}</>}</div>
            Likes:
            <div>{likes.length}</div>
            <div>
                {likes.map((user) => (
                    <div>
                        <Link key={user.user} to={`/TissueBoxd/profile/${user.user}`}>
                            {user.userName}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieDetails;
