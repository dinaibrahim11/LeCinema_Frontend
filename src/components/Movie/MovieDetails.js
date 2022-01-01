
import Button from 'react-bootstrap/Button'
const MovieDetails = (props) => {
    const movie = props.movie;
    console.log(movie);

    return (  
        <div className="movie-container">
            <img className="poster-image" src={movie.posterImage} alt={`${movie.title}-poster`} />
            <div className="movie-details">
                <h1 className="title">{movie.title}</h1>
                <p className="date"><span className="bold">Date: </span>{movie.date}</p>
                <p className="start-time"><span className="bold">Start Time: </span>{movie.startTime}</p>
                <p className="end-time"><span className="bold">End Time: </span>{movie.endTime}</p>
                <p className="screening-room"><span className="bold">Screening Room: </span>{movie.screenRoom}</p>
                
                <Button variant="primary" className="reserve-seat-button">Reserve a Seat</Button>
                <Button variant="success" className="view-seat-button">View Vacant Seats</Button>
            </div>
        </div>
    );
}
 
export default MovieDetails;