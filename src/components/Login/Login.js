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
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [emailError, setemailError] = useState('');
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

//---------------------------------------- HANDLING INPUTS ---------------------------------------//
// ** Handling input functions also contain validations to provide instant validation on typing ** //

const handleEmailInput = (e) => {
    setEmail(e.target.value); 
    if(!e.target.value){
      setemailError('Email is required');
    } else {setemailError('')}
}
    
const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    if(!e.target.value){
      setpassError('Password is required'); setUserError('');
    } else {setpassError('')}
    
}

// ---------------------------------------- json server -------------------------------------------//

/**
 * Checks if the user is actually registered or not
 * If registered, the user will be directed to the home page (logged in)
 * Otherwise, the user remains in login form page and is shown an error message : 'Incorrect email or password'
 */
const checkUserInput = () => {
  // API.get('users?email=' + email + '&password=' + password )
  // .then(response => {
  //   console.log(response.data);
  //   if(response.data.length > 0) {
  //     setIsUser(true);
  //     setUserError('');
  //     dispatch(usersActions.login({email: email, password: password, userId: response.data[0].id}));
  //     setRedirect("/home");

  //   } else if ( response.data.length === 0 && email && password) {
  //     setIsUser(false);
  //     setUserError('Incorrect email or password')
  //     setpassError('');
  //   }
  // })

  API.post('user/sign-in', {
    "email": email,
    "password": password
  }).then(res => {
    console.log(res);
    if (res.data.status === 'success') {
      //alert("sign in is correct");
      setIsUser(true);
      setUserError('');
      dispatch(usersActions.login({email: email, password: password, userId: res.data.token}));
      setRedirect("/home");
    } else {
      //alert("bad sign in");
      setIsUser(false);
      setUserError('Incorrect email or password')
      setpassError('');
    }
  }).catch(err => {
    console.log(err);
    alert("error"+err);
  });



}
    
// ---------------------------------------- VALIDATIONS ---------------------------------------------- //
// **Beside the validations written inside handling functions, we also need separate validation function ** //

const validateLoginInfo = () => {

    //Email
    if(!email){
        setemailError('Email is required'); setUserError('');
    }
    else {setemailError('')}

    //Password
    if(!password){
        setpassError('Password is required'); setUserError('');
    } else {setpassError('')}

     //Checking for the user in the database  
     if(isUser === false && email && password) {
         setUserError('Incorrect email or password');
     }

     if(isUser === true && email && password) {
       setUserError('');
     }

     
}

  const loginUser = () => {
    //Email
    if(!email){
      setemailError('Email is required'); setUserError('');
    }
    else {setemailError('')}

    //Password
    if(!password){
        setpassError('Password is required'); setUserError('');
    } else {setpassError('')}

    if(email && password) {
      setUserError('');
    } else {
      return;
    }

    API.post('user/sign-in', {
      "email": email,
      "password": password
    }).then(res => {
      console.log("DEBUG:: id="+res.data.data.user._id);
      console.log(res.data)
      if (res.data.status === 'success') {
        //alert("sign in is correct");
        setUserError('');
        dispatch(usersActions.login({
          email: email, 
          password: password, 
          userId: res.data.data.user._id,
          token: res.data.token,
          displayName: res.data.data.user.displayName,
          firstName: res.data.data.user.firstName,
          lastName: res.data.data.user.lastName
        }));
        setRedirect("/home");
      } else if (res.data.status === 'fail' && res.data.message === 'Invalid Email') {
        setUserError('Incorrect email');
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

// --------------------------------------- FACEBOOK LOGIN ----------------------------------------------- //

const [data, setData] = useState({});
const [login, setLogin] = useState(false);
const [picture, setPicture] = useState('');
const [userID, setUserID] = useState('');
const [name, setName] = useState('');
const [facebookEmail, setFacebookEmail] = useState();
const [isRegistered, setIsRegistered] = useState();

const responseFacebook = (response) => {
  console.log(response);
  setData(response);
  setPicture(response.picture);
  setFacebookEmail(response.email);
  setUserID(response.userID);
  setName(response.name);

  if (response.accessToken) {
    setLogin(true);
  } else {
    setLogin(false);
  }
} 

/**
 * Search for the user in our database, and if not found, record his/her info 
 * Since an already-registered user can click on login with facebook button
 * We want to avoid multiple records for a single person
 */
const postFacebookDataHandler = () => {
  API.get('users?email=' + facebookEmail)
  .then(response => {
    console.log(response.data);
    if(response.data.length === 0) {
          setIsRegistered(false);
       }})

       if(isRegistered === false) {
        const facebookUserInfo = {
          name: name,
          email: facebookEmail }
      API.post('users', facebookUserInfo)      //json server
      .then(response => {
       console.log(response)
     })  
}
}

/**
 * If user clicked on the Facebook login button he/she will be redirected to home page as well as
 * having their data recorded (if it wasn't already recorded)
 */
const componentClicked = () => {
  postFacebookDataHandler();
  setRedirect("/home");
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
                 <input type="email" placeholder="Email address" className={classes.div__inputfield}  id="login-email-field"
                        onChange={handleEmailInput} value={email} data-testid="email_input" />
                        <p className={classes.p__error}>{emailError}</p>
                </div>
       
                <div className={classes.div__input}>
                 <input type="password" placeholder="Password" className={classes.div__inputfield} id="login-psswrd-field"
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

                <div className={classes.div__forgetpassword}>
                <Link className={classes.a__forgetpassword} to ="/forgotpassword" id="forgot-psswrd-link"> Forgot password ? </Link> 
                </div> 
                  
                 <p> Signup <Link to ="/signup" id="signup-here-link"> here </Link> </p>
                 <br />    
                
                 </form>
         </div>
        </div>
    )
}

export default Login ;