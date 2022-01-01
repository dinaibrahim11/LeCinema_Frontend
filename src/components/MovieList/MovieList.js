import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './movie-list.css';
import Movie from '../Movie/Movie.js'


const MovieList = () => {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/movies")
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setMovies(data);
            })
    }, []);
    

    return (
        <div className="movie-list">
            {movies && movies.map((movie) => (
            <span className="movie">
                <Link to={`/movie/${movie.title}`}>
                <img className="movie-image" src={movie.posterImage} alt={movie.title} key={movie.id}></img>
                </Link>
            </span>
            ))}
        </div>
    );
}
 
export default MovieList;