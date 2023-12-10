import { useEffect, useState } from "react";
import * as client from "./movie-service";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./movie-results.css";

function MovieResults() {
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

  const search = async (text) => {
    const results = await client.fullTextSearch(text);
    setSearchResults(results.data);
  };

  const { criteria } = useParams();

  useEffect(() => {
    search(criteria);
  }, [criteria]);

  return (
    <div>
      <div className="container mt-4">
        <div className="list-group list-group-horizontal d-flex flex-row flex-wrap">
          {searchResults &&
            searchResults.Response == "True" &&
            searchResults.Search.map((rslt) => (
              <Link to={`/TissueBoxd/movie/${rslt.imdbID}`} key={rslt.imdbID} className="no-underline">
                <div className="card course-card d-flex flex-column h-100">
                  <img
                    src={rslt.Poster}
                    className="card-img-top"
                    alt="Poster"
                  ></img>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h4 className="card-title">{rslt.Title}</h4>
                    <p className="card-text">Year: {rslt.Year}</p>
                    <p className="card-text">IMDb ID: {rslt.imdbID}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {searchResults && searchResults.Response == "False" && (
        <div>
          <div>Error: No Result Found</div>
          <button onClick={() => navigate("/TissueBoxd/search/")}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieResults;
