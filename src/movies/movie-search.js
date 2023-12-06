import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function MovieSearch() {
    const [searchText, setSearchText] = useState('Avengers Endgame');
    const navigate = useNavigate();


    const search = async (text) => {
        navigate(`/TissueBoxd/search/${text}`);
    };

    return (
        <div>
            <input value={searchText} className="form-control w-50" onChange={(e) => setSearchText(e.target.value)} />
            <button className="btn btn-primary" onClick={() => search(searchText)}>
                Search By Title
            </button>
        </div>
    );
}

export default MovieSearch;
