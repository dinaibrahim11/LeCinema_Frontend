
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import MovieDetails from './MovieDetails.js';
import './movie.css';

const Movie = () => {
    const { movieTitle } = useParams();
    const [movie, setMovie] = useState(null);
    
    useEffect(() => {
        // fetch("http://localhost:8000/api/movies/" + "title")
        fetch("http://localhost:8000/api/movies/" + movieTitle) // get specific movie (GET)
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data[0]);
                setMovie(data[0]);
            })
    }, []);

    return ( 
        <div>
            {movie && <MovieDetails movie={movie} />}
        </div>
    );
}
 
export default Movie;