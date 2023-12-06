import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from './movie-service';
import * as likesClient from '../likes/client';
import * as userService from '../users/client';
import { useState } from 'react';
import ProtectedContent from '../users/protectedContent';
function MovieDetails() {
    const [movie, setMovie] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const { id } = useParams();

    const fetchMovie = async (id) => {
        const result = await client.imdbIDSearch(id);
        setMovie(result.data);
    };

    const like = async () => {
        if (movie){ 
            await likesClient.createUserLikesMovie(currentUser._id, id, movie.Title);
        }
    };
    const fetchCurrentUser = async () => {
        const user = await userService.account();
        setCurrentUser(user);
    };

    useEffect(() => {
        fetchMovie(id);
        fetchCurrentUser();
    }, [id]);

    return (
        <div>
            <ProtectedContent>
                <button onClick={like} className="btn btn-primary float-end">
                    Like
                </button>
            </ProtectedContent>
            <h1>{movie && movie.Title}</h1>
            <div>{movie && <>{JSON.stringify(movie)}</>}</div>
            
        </div>
    );
}

export default MovieDetails;
