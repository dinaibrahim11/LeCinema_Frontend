import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import MovieList from './MovieList';
import MovieListHeading from './MovieListHeading';
import SearchBox from './SearchBox';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
        //  const url = 'http://localhost:3000/api/movies';
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	
	return (
		<div className='container-fluid movie-app'>
		<div className='row d-flex align-items-center mt-4 mb-4'>
			<MovieListHeading heading="MOVIES" />
			<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
		</div>
		<div className='row'>
			<MovieList movies={movies} />
		</div>
	</div>


	);
};

export default Home;