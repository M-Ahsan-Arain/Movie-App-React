import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


const API_KEY = process.env.REACT_APP_MOVIE_APP_API_URL;
const API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`;


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);

        const data = await response.json();
        setMovies(data.Search);
        console.log(data);
    }

    const fetchDefaultMovies = async () => {
        const response = await fetch(`${API_URL}&s=movie&page=3`);  // Using 'movie' as a default search
        const data = await response.json();
        if (data.Response === "True") {
            setMovies(data.Search);  // Set default movies if the page loads
        } else {
            setMovies([]);  // No default movies found, set empty
        }
    };

    useEffect(() => {
        fetchDefaultMovies([]);  // Fetch default movies when the app loads
    }, []);


    return (
        <div className='app'>


            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    placeholder='search for movies'
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search-icon'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className='container'>
                            {
                                movies.map((movie) => (
                                    <MovieCard movie={movie} />
                                ))
                            }
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No Movies Found</h2>
                        </div>
                    )
            }



        </div>
    );
}

export default App;