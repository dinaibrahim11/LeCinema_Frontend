/* This component will be responsible for rendering different pages */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import Home from '../../pages/Home/Home';
import UserPage from '../../pages/UserPage/UserPage';
import './Main.css';
import Posts from '../Posts/Posts';
import PostDetail from '../PostDetail/PostDetail';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Unauthorized from '../Unauthorized/Unauthorized';
import { useSelector } from 'react-redux';
import Organizer from '../Organizer/Organizer'

import Welcome from '../../components/Welcome/Welcome';
import Login from '../../components/Login/Login';
import ForgetPassword from '../../components/ForgetPassword/ForgetPassword'
import Home from '../../pages/Home/Home';
import ResetPassword from '../../components/ResetPassword/ResetPassword'
import ResetPasswordSuccess from '../../components/ResetPasswordSuccess/ResetPasswordSuccess'
import ForgetPasswordSuccess from '../../components/ForgetPasswordSuccess/ForgetPasswordSuccess';
import Signup from '../../components/Signup/Signup';
import FormSuccess from '../../components/FormSuccess/FormSuccess';
import Movie from '../../components/Movie/Movie'
import MovieList from '../../components/MovieList/MovieList'

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
                <Route exact path="/" component={Welcome} />
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/post-signup" component={FormSuccess} />
                <Route exact path="/forgotpassword" component={ForgetPassword} />
                <Route exact path="/post-forgotpassword" component={ForgetPasswordSuccess} />
                <Route exact path="/forgotpassword-confirm" component={ResetPassword} />
                <Route exact path="/post-forgotpassword-confirm" component={ResetPasswordSuccess} />
                <ProtectedRoute exact path="/home" isLoggedIn={isLoggedIn} component={Posts}/>
                <Route exact path="/photos" component={PostDetail} />
                <Route exact path="/photos/:id" component={PostDetail} />
                <Route exact path='/Unauthorized' component={Unauthorized} />
                <Route exact path="/organize" component={Organizer}/>
                
                <Route exact path="/movie/:movieTitle" component={Movie}/>
                <Route exact path="/movielist" component={MovieList}/>
                
            </Switch>
            
        </main>
    );
};

export default Main;