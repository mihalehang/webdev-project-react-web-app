import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css";

function MovieSearch() {
    const [searchText, setSearchText] = useState('Avengers Endgame');
    const navigate = useNavigate();


    const search = async (text) => {
        navigate(`/TissueBoxd/search/${text}`);
    };

    return (
        <div class = "center-container-movie">
            <input value={searchText} className="form-control w-100" onChange={(e) => setSearchText(e.target.value)} />
            <button className="btn btn-primary search-button" onClick={() => search(searchText)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 20 20">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg> Search By Title 
            </button>
        </div>
    );
}

export default MovieSearch;
