import axios from "axios";

const KEY = process.env.REACT_APP_MOVIE_API_KEY;
// make this a process env variable before push
const MOVIE_API = "movie-database-alternative.p.rapidapi.com";
const MOVIE_URL = 'https://movie-database-alternative.p.rapidapi.com/';

export const fullTextSearch = async (text) => {
    const options = {
        method: 'GET',
        url: MOVIE_URL,
        params: {
          s: text,
          r: 'json',
          page: '1'
        },
        headers: {
          'X-RapidAPI-Key': KEY,
          'X-RapidAPI-Host': MOVIE_API,
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const imdbIDSearch = async (id) => {
    const options = {
        method: 'GET',
        url: MOVIE_URL,
        params: {
          r: 'json',
          i: id,
        },
        headers: {
            'X-RapidAPI-Key': KEY,
            'X-RapidAPI-Host': MOVIE_API,
          }
      };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
}