import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import { useHistory } from "react-router-dom"; 

const Home = () => {
    const [movies, setMovies] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [posterImage, setPosterImage] = useState('');
    const [screenRoom, setScreenRoom] = useState('');

    const history = useHistory();
    const movie2 = { title, date, startTime, endTime, posterImage, screenRoom };
        
	
	// fetch('http://localhost:8000/api/movies', {
    //         method: 'GET'
    //     }).then(() => {
    //         //history.push("/movie/" + movie2.title);
    //     })
    
        
    

    useEffect(() => {
        fetch("http://localhost:8000/api/movies")
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setMovies(data);
            })
    }, []);
    

    return (
        <div>
            <div id="add-movie-button-container">
            </div>
            <div className="movie-list">
                {movies && movies.map((movie) => (
                <span className="movie">
                    <Link to={`/movie/${movie.title}`}>
                    <img className="movie-image" src={movie.posterImage} alt={movie.title} key={movie.id}></img>
                    </Link>
                </span>
                ))}
            </div>
         
        </div>
    );
}
 
export default Home;