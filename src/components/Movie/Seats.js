import Button from 'react-bootstrap/Button'
import React, { useState } from 'react';
import './seats.css'

const Seats = ({ seats, change }) => {
    const [selected, setSelected] = useState([]); /* Array of seats ? or at least, array of states*/

    const handleSelected = (seat) => {
        if (!change) return;
        if (seat.reserved == true) {
            return;
        }
        if (selected.includes(seat.id)) {
            setSelected(prevSelected => prevSelected.filter((s) => s !== seat.id));
        } else {
            setSelected(prevSelected => ([...prevSelected, seat.id]));
        }
    };

    return (
        <div>
            <div class="seat-grid">
                {seats && seats.map((seat) => (
                    <span className={"seat-box" + (change == true ? " selectable-seat-box" : "") + (seat.reserved == true ? " unavailable-seat" : " available-seat") + (selected.includes(seat.id) ? " selected-seat" : "")} key={seat.id} onClick={() => handleSelected(seat)}>{seat.seatNumber}</span>
                ))}
            </div>
            {change &&
            <div className="center-content">
                <br />
                    <Button variant="outline-info" id="reserve-selected-seats-button">
                        Reserve Selected Seats
                    </Button>
                    </div>
                }
        </div>
    );
}

export default Seats;