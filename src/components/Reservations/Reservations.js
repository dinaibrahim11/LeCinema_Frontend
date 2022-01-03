import React, { useEffect, useState } from 'react';
import './reservations.css';

const Reservations = () => {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/movies") // should get from the logged in user's reserved movies
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setMovies(data);
            })
    }, []);

    return (

        <div className="center-content">
            <table className="movies-table">
                <tr>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Seat Number</th>
                    <th>Cancel Reservation</th>
                </tr>
                {movies && movies.map((movie) => (
                    <tr className="movie" key={movie.id}>
                        <td>
                            <img src={movie.posterImage} className="movie-img" />
                        </td>
                        <td>
                            {movie.title}
                        </td>
                        <td>
                            {movie.startTime}
                        </td>
                        <td>
                            {movie.endTime}
                        </td>
                        <td>
                            (Seat Number)
                        </td>
                        <td>
                            x
                        </td>
                    </tr>
                ))}
            </table>
        </div>

    );
}

export default Reservations;