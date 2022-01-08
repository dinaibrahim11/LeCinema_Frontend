import React, { useState } from 'react' ;
import {Link} from 'react-router-dom';
import { Redirect } from "react-router-dom";
import  './Login.css';
import { useDispatch } from 'react-redux';
import { usersActions } from '../../storev2/users-slice';
import API from '../../API';
const Login = () => {

const dispatch = useDispatch();

const [isUser, setIsUser] = useState();
const [redirect, setRedirect] = useState(null);
const [userName, setuserName] = useState('');
const [password, setPassword] = useState('');

const [usernameError, setusernameError] = useState('');
const [passError, setpassError] = useState('');
const [userError, setUserError] = useState('');

const [isSubmitting, setisSubmitting] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();
    login();
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
const login = () => {




  
  API.post('/signin', {
    "userName": userName,
    "password": password
  }, {
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
    console.log(res);
    if (res.status === 200) {
      setIsUser(true);
      setUserError('');
      dispatch(usersActions.login({userName: userName, password: password, token: res.data.token,}));
      localStorage.setItem('newToken', res.data.token);
      setRedirect("/");
    } else {

      setIsUser(false);
      setUserError('Incorrect username or password')
      setpassError('');
    }
  }).catch(err => {
    console.log(err);
    alert("error"+err);
  });

}
if(redirect) {
  return (
    <Redirect to={redirect} />
  )
}
    return (     
        <div className="page" >
        <div className="div_login_page">
           <form className="form_login" onSubmit={handleSubmit} >
                <h5 className="h5_center"> Login to leCinema </h5>
       
                <div className="div_input">
                 <input type="username" placeholder="username" className="div_inputfield" 
                        onChange={handleuserNameInput} value={userName}  />
                        <p className="p_error">{usernameError}</p>
                </div>
                <div className="div_input">
                 <input type="password" placeholder="password" className="div_inputfield" 
                        onChange={handlePasswordInput} value={password} />
                        <p className="p_error">{passError}</p>
                  </div>

                  <div className="div_usererror">
                    <p className="p_error">{userError}</p>
                  </div>
       
                <div className="div_input">
                <button className="div_loginbutton" > Login </button>
                </div>       
                 <p> Signup <Link to ="/signup" > here </Link> </p>
                 <br />    
                 </form>
         </div>
        </div>
    )
}

export default Login ;