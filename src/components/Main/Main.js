/* This component will be responsible for rendering different pages */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Main.css';
import Unauthorized from '../Unauthorized/Unauthorized';
import { useSelector } from 'react-redux';
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import Home from '../../components/Home/Home';

import Movie from '../../components/Movie/Movie';
import MovieList from '../../components/MovieList/MovieList';
import UsersList from '../../components/UsersList/UsersList';
import Reservations from '../../components/Reservations/Reservations';

const Main = (props) => {

    const isLoggedIn = useSelector(state => state.users.currentUser.isLoggedIn);
    const searchQuery = useSelector(state => state.users.currentSearchQuery);
    const currentUserId = useSelector(state => state.users.currentUser.userId);

    return (
        <main>
            <Switch>
            <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path='/Unauthorized' component={Unauthorized} />
                
                <Route exact path="/movie/:movieTitle" component={Movie}/>
                <Route exact path="/movielist" component={MovieList}/>
                <Route exact path="/userslist" component={UsersList}/>
                <Route exact path="/reservations" component={Reservations}/>
                
            </Switch>
            
        </main>
    );
};

export default Main;