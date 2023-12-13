import MovieSearch from "../../movies/movie-search";
import "./index.css";
import afterSearchImage from "./search-tutorial/after-search.png";
export default function Search() {
    return (
        <div className = "center-container">
            <h1>Search For a Movie</h1>
            <MovieSearch/>
            <div>
                Get started by searching for a film, type in any keyword or title
            </div>
        </div>
    );
}