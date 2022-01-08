import Button from 'react-bootstrap/Button'
import React, { useEffect, useState } from 'react';
import './reservations.css';

const Reservations = () => {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/movies") // should get from the logged in user's reserved movies
            .then(res => {
                return res.json(); // note: needs token
            })
            .then((data) => {
                console.log(data);
                setMovies(data);
            }).catch(err => {
                alert("Error! " + err);
            })
    }, []);

    const handleCancel = (movie) => {

        /*
        let today = new Date();
        
        let parts = movieDate.split("/");
        let partsTime = movieStartTime.split(":");
        let partsTime2 = partsTime[1].split(" ");

        let dt = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10),
                  parseInt(partsTime[0], 10) + (partsTime2[1] == "AM" ? 0 : 12),
                  parseInt(partsTime2[0], 10));

        // console.log(dt - today);
        // console.log(dt);        

        if (dt - today >= 3*60*60*1000) { // if difference in time is more than 3 hours (in miliseconds)
            
        } else {
            alert("Too late to cancel reservation.");
        }
        */
       
       
        fetch('http://localhost:8000/api/cancelReserve/' + movie.id, { // NOTE: needs token, currently just deletes movies entirely
            method: 'DELETE', // also it should be reservation id not movie id?
            /*headers: {
                Authentication: 'Bearer Token',
            }
            */
            }).then(() => {
            // history.push('/movielist');
            window.location.reload();
            alert("Deleted " + movie.title + " reservation successfully!");
            }).catch(err => {
                alert("Error! " + err);
            })

    }

    return (

        <div className="center-content">
            <table className="movies-table">
                <tr>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Date</th>
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
                            {movie.date}
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
                            <Button variant="primary" className="cancel-reservation-button" onClick={() => handleCancel(movie)}>Cancel</Button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>

    );
}

export default Reservations;