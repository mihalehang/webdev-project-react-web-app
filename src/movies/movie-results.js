import { useEffect, useState } from 'react';
import * as client from './movie-service';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
            {searchResults &&
                searchResults.Response == 'True' &&
                searchResults.Search.map((rslt) => (
                    <Link to={`/TissueBoxd/movie/${rslt.imdbID}`} key={rslt.imdbID}>
                        <div>
                            <div>
                                <h1>{rslt.Title} </h1>
                            </div>
                            <div>
                                Poster:
                                <img src={rslt.Poster} alt="Poster"></img>
                            </div>
                            <div>
                                Year:
                                {rslt.Year}
                            </div>
                            <div>
                                imdbID:
                                {rslt.imdbID}
                            </div>
                        </div>
                    </Link>
                ))}
            {searchResults && searchResults.Response == 'False' && (
                <div>
                    <div>Error: No Result Found</div>
                    <button onClick={() => navigate('/TissueBoxd/search/')}>Try Again</button>
                </div>
            )}
        </div>
    );
}

export default MovieResults;
