import React, { useState, useEffect } from 'react' ;
import {Link} from 'react-router-dom';
import { Redirect } from "react-router-dom";
import classes from './Login.module.css';
import { useDispatch } from 'react-redux';
import { usersActions } from '../../storev2/users-slice';
import API from '../../fakeAPI';



/**
 * Login existing user
 * @author 
 * @async
 * @example <Login />
 * @returns {element} The Login form contents
 *
 */
const Login = () => {

const dispatch = useDispatch();
const apiURL = "http://localhost:3000/users" ;   //json server

const [isUser, setIsUser] = useState();
const [redirect, setRedirect] = useState(null);
const [userName, setuserName] = useState('');
const [password, setPassword] = useState('');

const [usernameError, setusernameError] = useState('');
const [passError, setpassError] = useState('');
const [userError, setUserError] = useState('');

const [isSubmitting, setisSubmitting] = useState(false);

/**
 * Handles what happens when form is submitted
 * 
 * @param {object} e - the JavaScript event object
 */
const handleSubmit = (e) => {
    e.preventDefault();
    // checkUserInput();
    // validateLoginInfo();
    loginUser();
    setisSubmitting(true);
}


const handleuserNameInput = (e) => {
    setuserName(e.target.value); 
    if(!e.target.value){
      setusernameError('Username is required');
    } else {setusernameError('')}
}
    
const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    if(!e.target.value){
      setpassError('Password is required'); setUserError('');
    } else {setpassError('')}
    
}



const checkUserInput = () => {
  

  API.post('user/sign-in', {
    "userName": userName,
    "password": password
  }).then(res => {
    console.log(res);
    if (res.data.status === 'success') {
      //alert("sign in is correct");
      setIsUser(true);
      setUserError('');
      dispatch(usersActions.login({userName: userName, password: password, userId: res.data.token}));
      setRedirect("/home");
    } else {
      //alert("bad sign in");
      setIsUser(false);
      setUserError('Incorrect username or password')
      setpassError('');
    }
  }).catch(err => {
    console.log(err);
    alert("error"+err);
  });



}
    

const validateLoginInfo = () => {

    if(!userName){
        setusernameError('Username is required'); setUserError('');
    }
    else {setusernameError('')}

    if(!password){
        setpassError('Password is required'); setUserError('');
    } else {setpassError('')}

     //Checking for the user in the database  
     if(isUser === false && userName && password) {
         setUserError('Incorrect username or password');
     }

     if(isUser === true && userName && password) {
       setUserError('');
     }

     
}

  const loginUser = () => {
  
    if(!userName){
      setusernameError('Username is required'); setUserError('');
    }
    else {setusernameError('')}

    if(!password){
        setpassError('Password is required'); setUserError('');
    } else {setpassError('')}

    if(userName && password) {
      setUserError('');
    } else {
      return;
    }

    API.post('user/sign-in', {
      "userName": userName,
      "password": password
    }).then(res => {
      console.log("DEBUG:: id="+res.data.data.user._id);
      console.log(res.data)
      if (res.data.status === 'success') {
        //alert("sign in is correct");
        setUserError('');
        dispatch(usersActions.login({
          userName: userName, 
          password: password, 
          userId: res.data.data.user._id,
          token: res.data.token,
          displayName: res.data.data.user.displayName,
          firstName: res.data.data.user.firstName,
          lastName: res.data.data.user.lastName
        }));
        setRedirect("/home");
      } else if (res.data.status === 'fail' && res.data.message === 'Invalid UserName') {
        setUserError('Incorrect UserName');
      } else if (res.data.status === 'fail' && res.data.message === 'Invalid Password') {
        setUserError('Incorrect password');
      } else {
        //alert("bad sign in");
        setUserError('Incorrect email or password')
        setpassError('');
      }
    }).catch(err => {
      console.log(err);
      setUserError('Incorrect email or password')
    });

  }




// ------------------------------------------ RETURN -------------------------------------------------- //

if(redirect) {
  return (
    <Redirect to={redirect} />
  )
}

    return (     
        <div className="page" >
        <div className={classes.div__login_page}>
       
           <form className={`${classes.login__page} ${classes.form__login}`} onSubmit={handleSubmit} data-testid="form">
                <h5 className={classes.h5__center}> Login to leCinema </h5>
       
                <div className={classes.div__input}>
                 <input type="username" placeholder="username" className={classes.div__inputfield}  id="login-username-field"
                        onChange={handleuserNameInput} value={userName} data-testid="username_input" />
                        <p className={classes.p__error}>{usernameError}</p>
                </div>
       
                <div className={classes.div__input}>
                 <input type="password" placeholder="password" className={classes.div__inputfield} id="login-psswrd-field"
                        onChange={handlePasswordInput} value={password} data-testid="password_input"/>
                        <p className={classes.p__error}>{passError}</p>
                  </div>

                  <div className={classes.div__usererror}>
                    <p className={classes.p__error2}>{userError}</p>
                  </div>
       
                <div className={classes.div__input}>
                  {/* TODO: check if center not working, import from classes */}
                <button className={classes.div_loginbutton} id="login-signin-btn" data-testid="button"> Login </button>
                </div>       

                  
                 <p> Signup <Link to ="/signup" id="signup-here-link"> here </Link> </p>
                 <br />    
                
                 </form>
         </div>
        </div>
    )
}

export default Login ;