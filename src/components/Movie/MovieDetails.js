import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom"; 
import './moviedetails.css'
import Seats from './Seats'

const MovieDetails = (props) => {
    const movie = props.movie;
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(movie.title);
    const [date, setDate] = useState(movie.date);
    const [startTime, setStartTime] = useState(movie.startTime);
    const [endTime, setEndTime] = useState(movie.endTime);
    const [posterImage, setPosterImage] = useState(movie.posterImage);

    const [showSeatsModal, setShowSeatsModal] = useState(false);
    
    const [reserveSeatsModal, setReserveSeatsModal] = useState(false);
    
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const movie2 = { title, date, startTime, endTime, posterImage };
        console.log(movie._id);
        // fetch("http://localhost:8000/api/movies/" + "title")
        fetch("http://localhost:8000/movies/" + movie.id, { // Edit movie (PUT)
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie2)
        })
            .then(() => {
                // console.log(movie2);
                history.push("/movie/" + movie2.title);
                window.location.reload();
            })
    }

    const handleSeatSubmit = (event) => {

    }

    const deleteMovie = () => {
        fetch('http://localhost:8000/movies/' + movie.id, {
            method: 'DELETE'
            }).then(() => {
            history.push('/movielist');
            }) 
    }


return (
    <span>
        <div className="movie-container">
            <img className="poster-image" src={movie.posterImage} alt={`${movie.title}-poster`} />
            <div className="movie-details">
                <h1 className="title">{movie.title}</h1>
                <p className="date"><span className="bold">Date: </span>{movie.date}</p>
                <p className="start-time"><span className="bold">Start Time: </span>{movie.startTime}</p>
                <p className="end-time"><span className="bold">End Time: </span>{movie.endTime}</p>
                <p className="screening-room"><span className="bold">Screening Room: </span>{movie.screenRoom}</p>

                <Button variant="primary" className="reserve-seat-button" onClick={() => setReserveSeatsModal(true)} >Reserve a Seat</Button>
                <Button variant="success" className="view-seat-button" onClick={() => setShowSeatsModal(true)}>View Vacant Seats</Button>

                <Button variant="primary" className="edit-details-button" onClick={() => setShowModal(true)}>Edit Details</Button>
            </div>
        </div>


        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="xl"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Edit "{movie.title}" Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required onChange={(e) => setTitle(e.target.value)} defaultValue={movie.title} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control required onChange={(e) => setDate(e.target.value)} defaultValue={movie.date} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control required onChange={(e) => setStartTime(e.target.value)} defaultValue={movie.startTime} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control required onChange={(e) => setEndTime(e.target.value)} defaultValue={movie.endTime} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Poster Image URL</Form.Label>
                        <Form.Control required onChange={(e) => setPosterImage(e.target.value)} defaultValue={movie.posterImage} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                    <Button id="delete-button" variant="danger" onClick={() => {if (window.confirm("Are you sure you want to delete this movie?")) deleteMovie();}}>
                        Delete
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

        <Modal
            show={showSeatsModal}
            onHide={() => setShowSeatsModal(false)}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    View Seats for "{movie.title}"
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Seats seats={movie.seats} change={false} />
            </Modal.Body>
        </Modal>

        <Modal
            show={reserveSeatsModal}
            onHide={() => setReserveSeatsModal(false)}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Reserve seats for "{movie.title}"
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Seats seats={movie.seats} change={true} />
            </Modal.Body>
        </Modal>

        {/*
        <Form onSubmit={handleSeatSubmit}>
                    <Seats seats={movie.seats} />
                    <br />
                    <div className="center-container">
                        <Button variant="outline-success" type="submit" id="reserve-selected-seats-button">
                            Reserve Selected Seats
                        </Button>
                    </div>
                </Form>
        */}
        
    </span>
);
}

export default MovieDetails;