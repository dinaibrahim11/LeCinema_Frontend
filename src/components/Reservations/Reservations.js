import Button from 'react-bootstrap/Button'
import React, { useEffect, useState } from 'react';
import './reservations.css';

const Reservations = () => {
    // const [movies, setMovies] = useState(null);
    const [reservationIDs, setReservationIDs] = useState(null);
    const [movieNames, setMovieNames] = useState(null);

    const [token, setTokens] = useState(localStorage.getItem('newToken'));
    useEffect(() => {
        fetch("http://localhost:8000/api/getReservationId", { // should get from the logged in user's reserved movies
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => {
                return res.json(); // note: needs token
            })
            .then((data) => {
                console.log(data);
                setReservationIDs(data);
            }).catch(err => {
                alert("Error! " + err);
            })
    }, []);

    useEffect(() => {
        fetch("http://localhost:8000/api/getReservationMovie", { // should get from the logged in user's reserved movies
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => {
                return res.json(); // note: needs token
            })
            .then((data) => {
                console.log(data);
                setMovieNames(data);
            }).catch(err => {
                alert("Error! " + err);
            })
    }, []);

    /*
    const getAllMovies = () => {
        for (let i = 0; i < reservationIDs.length; i++) {
            useEffect(() => {
                // fetch("http://localhost:8000/api/movies/" + "title")
                fetch("http://localhost:8000/api/movies/" + movieNames[i]) // get specific movie (GET)
                    .then(res => {
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data[0]);
                        setMovies(movies => [...movies,data]);
                    })
            }, []);
        }
    }
    */

const handleCancel = (movie) => {
        
        fetch('http://localhost:8000/api/cancelReserve/' + movie, { // NOTE: needs token, currently just deletes movies entirely
            method: 'DELETE', // also it should be reservation id not movie id?
            headers: {
                'Authorization': 'Bearer ' + token
            }
            
        }).then(() => {
            // history.push('/movielist');
            window.location.reload();
            alert("Deleted reservation successfully!");
        }).catch(err => {
            alert("Error! " + err);
        })

}

    return (

        <div className="center-content">
            {reservationIDs && movieNames && reservationIDs.map((reservationIDs, i) => (
                <Button variant="primary" className="cancel-reservation-button" onClick={() => handleCancel(reservationIDs)}>Cancel {movieNames[i]}</Button>
            ))}
        </div>

    );
}

 export default Reservations;