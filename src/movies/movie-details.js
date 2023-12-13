import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "./movie-service";
import * as likesClient from "../likes/client";
import * as userService from "../users/client";
import { useState } from "react";
import ProtectedContent from "../users/protectedContent";
import "./movie-details.css";

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
        currentUser.firstName + " " + currentUser.lastName,
        id,
        movie.Title,
        { poster: movie.Poster }
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

  const handleRefreshLike = () => {
    like();
    window.location.reload();
  };

  const handleRefreshUnlike = () => {
    unlike();
    window.location.reload();
  };

  useEffect(() => {
    fetchMovie(id);
    fetchCurrentUser();
  }, [id]);

  return (
    <div>
      <h1 className="movie-title">{movie && movie.Title}</h1>

      <div className="row">
        <div className="col-md-4 bg-light p-4 rounded">
          <p className="mb-3">
            {movie && movie.Year} {"\u00B7"} {movie && movie.Rated} {"\u00B7"}{" "}
            {movie && movie.Runtime}
          </p>
          <img
            src={movie && movie.Poster}
            alt="The Movie Poster"
            className="img-fluid mb-3"
          />
          <p className="mb-1">
            <strong>Director(s):</strong> {movie && movie.Director}
          </p>
          <p className="mb-1">
            <strong>Writer(s):</strong> {movie && movie.Writer}
          </p>
          <p className="mb-1">
            <strong>Actors:</strong> {movie && movie.Actors}
          </p>
          <a
            href={movie ? `https://www.imdb.com/title/${movie.imdbID}` : "#"}
            className="btn btn-warning me-2"
          >
            Go to IMDb
          </a>
          <ProtectedContent>
            {!alreadyLiked() ? (
              <button
                onClick={handleRefreshLike}
                disabled={clicked}
                className="btn btn-success ms-2"
              >
                Like
              </button>
            ) : (
              <button
                onClick={handleRefreshUnlike}
                disabled={clicked}
                className="btn btn-danger ms-2"
              >
                Unlike
              </button>
            )}
          </ProtectedContent>
        </div>

        <div className="col-md-8 bg-white p-4 rounded shadow description">
          <p className="mb-3">
            <strong>Released:</strong> {movie && movie.Released}
          </p>
          <p className="mb-3">
            <strong>Genre:</strong> {movie && movie.Genre}
          </p>
          <p className="mb-3">
            <strong>Plot:</strong>
            <br />
            {movie && movie.Plot}
          </p>
          <p className="mb-3">
            <strong>Language:</strong> {movie && movie.Language}
          </p>
          <p className="mb-3">
            <strong>Country:</strong> {movie && movie.Country}
          </p>
          <p className="mb-3">
            <strong>Awards:</strong> {movie && movie.Awards}
          </p>
        </div>
      </div>

      <hr></hr>

      <h3>Likes: {likes.length}</h3>
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
