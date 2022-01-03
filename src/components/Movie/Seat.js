import React, { useState } from 'react';
import './seat.css'

const Seat = (props) => {
    const seat = props.seat;
    const [selected, setSelected] = useState(false);
    const handleSelect = () => {
        if (selected == false)
            setSelected(true);
        else if (selected == true)
            setSelected(false);
    }

    return ( 
        <span className={"seat-box" + (seat.reserved == true ? " unavailable-seat" : " available-seat") + (selected ? " selected-seat" : "")} key={seat.id} onClick={() => handleSelect()}>{seat.seatNumber}</span>    
     );
}
 
export default Seat;