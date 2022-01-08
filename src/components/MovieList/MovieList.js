import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './movie-list.css';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom"; 
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

const MovieList = () => {
    const [movies, setMovies] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('00:00');
    // const [endTime, setEndTime] = useState('');
    const [posterImage, setPosterImage] = useState('');
    const [screenRoom, setScreenRoom] = useState('');

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const movie2 = { title, date, startTime, posterImage, screenRoom };
        fetch('http://localhost:8000/api/movie', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie2)
        }).then(() => {
            // history.push("/movie/" + movie2.title);
            window.location.reload();
            alert("Added " + movie2.title + " successfully!");
        }).catch(err => {
            alert("Error! " + err);
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/api/movies")
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setMovies(data);
            }).catch(err => {
                alert("Error! " + err);
            })
    }, []);
    

    return (
        <div>
            <div id="add-movie-button-container">
            <Button variant="primary" onClick={() => setShowModal(true)}>Add New Movie</Button>
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
            <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="xl"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Add New Movie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control required onChange={(e) => setDate(e.target.value)}/>
                    </Form.Group>

                    {
                        <Form.Group className="mb-3">
                            <Form.Label>Start Time</Form.Label>
                            <br />
                            <select name="startTime" id="startTime" required onChange={e => setStartTime(e.target.value)}>
                                <option value="00:00">12:00 AM</option>
                                <option value="03:00">3:00 AM</option>
                                <option value="06:00">6:00 AM</option>
                                <option value="09:00">9:00 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="15:00">3:00 PM</option>
                                <option value="18:00">6:00 PM</option>
                                <option value="21:00">9:00 PM</option>
                            </select>
                        </Form.Group>
                    }
                    {/*
                    <Form.Group className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control required onChange={(e) => setStartTime(e.target.value)}/>
                    </Form.Group>
                */}
                    {/*
                    <Form.Group className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control required onChange={(e) => setEndTime(e.target.value)}/>
                    </Form.Group>
                    */}
                    <Form.Group className="mb-3">
                        <Form.Label>Screening Room</Form.Label>
                        <Form.Control required onChange={(e) => setScreenRoom(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Poster Image URL</Form.Label>
                        <Form.Control required onChange={(e) => setPosterImage(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </div>
    );
}
 
export default MovieList;