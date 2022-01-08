import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import './seats.css'

const Seats = ({ seats, change, movie }) => {
    const [selected, setSelected] = useState([]); /* Array of seats ? or at least, array of states*/
    const [creditCard, setCreditCard] = useState(null);
    const [pin, setPin] = useState(null);

    const handleSelected = (seat) => {
        if (!change) return;
        if (seat.reserved == true) {
            return;
        }
        if (selected.includes(seat.seatNumber)) {
            setSelected(prevSelected => prevSelected.filter((s) => s !== seat.seatNumber));
        } else {
            setSelected(prevSelected => ([...prevSelected, seat.seatNumber]));
        }
    };

    const handleSubmit = (event) => {
        let token = localStorage.getItem('newToken');

        event.preventDefault();
        // fetch("http://localhost:8000/api/movies/" + "title")
        console.log(movie.seats);
        console.log(selected);
        for (let i = 0; i < movie.seats.length; i++) {
            if (selected.includes(movie.seats[i].seatNumber)) {
                movie.seats[i].reserved = true;
            }
        } 
        
        fetch("http://localhost:8000/api/reserve/" + movie.id, { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token },
            body: JSON.stringify({selected, pin, creditCard}) // was previously JSON.stringify({movie})
            // NOTE: needs token
        })
        .then(() => {
            window.location.reload();
            alert("Reserved " + selected.length + " seats successfully!");
        }).catch(err => {
            alert("Error! " + err);
        })
            
    }

    return (
        <div>
            <div class="seat-grid">
                {seats && seats.map((seat) => (
                    <span className={"seat-box" + (change == true ? " selectable-seat-box" : "") + (seat.reserved == true ? " unavailable-seat" : " available-seat") + (selected.includes(seat.seatNumber) ? " selected-seat" : "")} key={seat.id} onClick={() => handleSelected(seat)}>{seat.seatNumber}</span>
                ))}
            </div>
            {change &&
            <div className="center-content">
                <br />
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Credit Card</Form.Label>
                        <Form.Control required type="number" onChange={(e) => setCreditCard(e.target.value)} placeholder="0000000000000000"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>PIN</Form.Label>
                        <Form.Control required type="number" onChange={(e) => setPin(e.target.value)} placeholder="0000"/>
                    </Form.Group>
                    <Button variant="outline-info" id="reserve-selected-seats-button" type={(selected == "") ? "" : "submit"}>
                        Reserve Selected Seats
                    </Button>
                </Form>
                    </div>
                }
        </div>
    );
}

export default Seats;