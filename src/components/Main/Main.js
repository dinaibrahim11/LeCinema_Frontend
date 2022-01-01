/* This component will be responsible for rendering different pages */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Main.css';
import Posts from '../Posts/Posts';
import PostDetail from '../PostDetail/PostDetail';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Unauthorized from '../Unauthorized/Unauthorized';
import { useSelector } from 'react-redux';

import Explore from '../../components/Explore/ExplorePage';
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import FormSuccess from '../../components/FormSuccess/FormSuccess';

/**
 * Responsible for the routing of the whole website
 * @example <Main />
 * 
 *     
 */
const Main = (props) => {

    const isLoggedIn = useSelector(state => state.users.currentUser.isLoggedIn);
    const searchQuery = useSelector(state => state.users.currentSearchQuery);
    const currentUserId = useSelector(state => state.users.currentUser.userId);

    return (
        <main>
            <Switch>
                <Route exact path="/" component={Explore} />
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/post-signup" component={FormSuccess} />
                <ProtectedRoute exact path="/home" isLoggedIn={isLoggedIn} component={Posts}/>
                <Route exact path="/photos" component={PostDetail} />
                <Route exact path="/photos/:id" component={PostDetail} />
                <Route exact path='/Unauthorized' component={Unauthorized} />
                
                
            </Switch>
            
        </main>
    );
};

export default Main;