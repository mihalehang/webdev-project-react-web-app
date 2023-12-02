import { useState } from 'react';
import * as client from './movie-service';
import { Link } from 'react-router-dom';

function MovieSearch() {
    const [searchResults, setSearchResults] = useState(null);
    const [searchText, setSearchText] = useState('Avengers Endgame');

    const search = async (text) => {
        const results = await client.fullTextSearch(text);
        setSearchResults(results.data);
    };

    return (
        <div>
            <input value={searchText} className="form-control w-50" onChange={(e) => setSearchText(e.target.value)} />
            <button className="btn btn-primary" onClick={() => search(searchText)}>
                Search By Title
            </button>
            {searchResults &&
                searchResults.Response == 'True' &&
                searchResults.Search.map((rslt) => (
                    <Link to={`/search/${rslt.imdbID}`} key={rslt.imdbID}>
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
            {searchResults && searchResults.Response == 'False' && <div> Error</div>}
        </div>
    );
}

export default MovieSearch;
