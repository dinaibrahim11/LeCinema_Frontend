import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import MovieList from './MovieList';

const Home = () => {
	const [movies, setMovies] = useState([
        {
          "_id": "61d28d984cfe59c0ce1642a3",
          "title": "THE HILL",
          "date": "10/21/2021",
          "startTime": "06:00",
          "endTime": "08:30",
          "screenRoom": 1,
          "posterImage": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fbc%2Fd5%2Fc9%2Fbcd5c9519581acc60bd60a429ab0c88f.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F255368241358397299%2F&tbnid=ihnlbFcCyl_zKM&vet=12ahUKEwjMobLP1JT1AhVS4BoKHYHlBRgQMygAegUIARDRAQ..i&docid=jwJfzwCWAGfRPM&w=1131&h=1600&itg=1&q=movie%20poster%20images&ved=2ahUKEwjMobLP1JT1AhVS4BoKHYHlBRgQMygAegUIARDRAQ",
          "__v": 0,
          "id": "61d28d984cfe59c0ce1642a3"
        }
      ]);
	
	return (
        <div className='container-fluid movie-app'>
        <div className='row'>
            <MovieList movies={movies} />
        </div>
    </div>
	);
};

export default Home;