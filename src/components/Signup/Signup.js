import React, { useState } from 'react'
import './Signup.css'
import {Link} from 'react-router-dom'
import { Redirect } from "react-router-dom";
import API from '../../API';
import { useDispatch } from 'react-redux';
import { usersActions } from '../../storev2/users-slice';
import styled from 'styled-components';

const Signup = () => {
const DropDownContainer = styled("div")`
width: 10.5em;
margin: 0 auto;
`;

const DropDownHeader = styled("div")`
margin-bottom: 0.8em;
padding: 0.4em 2em 0.4em 1em;
box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
font-weight: 500;
font-size: 1.3rem;
color: black;
background: #ffffff;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
padding: 0;
margin: 0;
padding-left: 1em;

border: 2px solid #e5e5e5;
box-sizing: border-box;

font-size: 1.3rem;
font-weight: 500;
&:first-child {
  padding-top: 0.8em;
}
`;

const ListItem = styled("li")`
list-style: none;
margin-bottom: 0.8em;
`;
const options = ["Customer", "Manager"];
  const dispatch = useDispatch();
  const [isUser, setIsUser] = useState();
  const [redirect, setRedirect] = useState(null);
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const [fnError, setfnError] = useState();
  const [lnError, setlnError] = useState();
  const [usernameError, setusernameError] = useState('');
  const [emailError, setemailError] = useState();
  const [passError, setpassError] = useState();
  const [confirmpassError, setconfirmpassError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userError, setUserError] = useState('');

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  const [isSubmitting, setisSubmitting] = useState(false);
  const handleSubmit = (e) => {
      e.preventDefault();
      setisSubmitting(true);
      signup();
  }   
  const handleFirstNameInput = (e) => {
  setFirstname(e.target.value);

  if(e.target.value) 
  {setfnError(''); }
  else {
    setfnError('First name required')
  }
  }
  const handleLastNameInput = (e) => {
  setLastname(e.target.value); 

  if(e.target.value) 
  {setlnError(''); }
  else {
    setlnError('Last name required')
  }
  }

  const handleUserNameInput = (e) => {
    setuserName(e.target.value); 
  
    if(e.target.value) 
    {setusernameError('');}
    else {
      setusernameError('Username required')
    }
    }

  const handleEmailInput = (e) => {
  setEmail(e.target.value);  
  
  if(!e.target.value){
    setemailError('Email is required');
  }
  else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
    setemailError('Email address is invalid');
  }
  else {setemailError(''); }
  }

  const handlePasswordInput = (e) => {
  setPassword(e.target.value);

  if(!e.target.value){
    setpassError('Password is required');
  
  } else if (e.target.value.length < 8) {
    setpassError('Password should be 8 characters or more');
  } else {setpassError(''); }
  }
  const handleconfirmPasswordInput = (e) => {
    setconfirmPassword(e.target.value);
  
    if(!e.target.value){
      setconfirmpassError('Confirm Password is required');
    } else if (e.target.value !== password) {
      setconfirmpassError('Confirm Password is wrong')
    } else {setconfirmpassError(''); }
    }
  

  
  const signup = () => {
    setisSubmitting(true);
    setfnError(''); 
    setlnError('');
    setusernameError('');
    setemailError('');
    setpassError(''); 
    setconfirmpassError('');
 
    if(!firstName) {
      setfnError('First name is required');
    } else{setfnError(''); }

    if(!lastName) {
        setlnError('Last name is required');
   
    } else{setlnError(''); }

    if(!userName) {
      setusernameError('Username is required');
   
  } else{setusernameError('');}

    if(!email){
        setemailError('Email is required');
    
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
        setemailError('Email address is invalid');
   
    }
    else {setemailError(''); }

    if(!password){
        setpassError('Password is required');
    
    } else if (password.length < 8) {
        setpassError('Password should be 8 characters or more');
   
    } else {
      if (checkPassword(password)){
        setpassError(''); 
  
      } else {
        setpassError('Password is weak, should have uppercase, lowercase, and digit');
      
      }
    }
  

     if(emailError==='' && passError==='' && confirmpassError==='' && usernameError==='' && fnError==='' && lnError===''){
      const userInfo = {
        "firstName" : firstName,
        "lastName": lastName,
        "userName": userName,
        "email": email,
        "password": password,
        "confirmPassword": confirmpassword,
        "role": selectedOption  
       }
        API.post('/signup', userInfo , {
          headers: {
            'content-type': 'application/json'
          }
        }) 
          .then(res => {
            console.log(res);
            if (res.status === 201) {
            setIsUser(true);
            setUserError('');
    
              dispatch(usersActions.login({
                email: email, 
                password: password, 
                confirmpassword: confirmpassword,
                token: res.data.token,
                userName: userName,
                firstName: firstName,
                lastName: lastName
              }));
              setRedirect("/");
            }
            else {
              
              setIsUser(false);
              setUserError('Incorrect information')

              return;
              
            } 
      })
      .catch(err => {
        console.log(err.response);
        console.log(err.response.data.status);
       
        if (err.response.data.status === 400) {
          if (err.response.data.message.toString().includes("Duplicate")) {
            setemailError("email already registered");
          }
          setisSubmitting(false);
        } 
      })
    }

  }
    const checkPassword = (str) => {
      let digit = false;
      let lowerCase = false;
      for (let i = 0; i < str.length; i++) {
        let character = str.charAt(i);
        if (!isNaN(character * 1)){
          digit = true;
        }else{
          if (character === character.toLowerCase()){
              lowerCase = true;
          }
      }
      }
      return (lowerCase && digit );
    }

if(redirect) {
  return (
    <Redirect to={redirect} />
  )
}

return (

  <div className="page"  >
 <div  className="div_signup_page">

    <form className="form_signup_page" onSubmit={handleSubmit}>
         <h5 className="classes.center"> Signup to leCinema</h5>

         <div className="classes.div__input">
         <input type="text" placeholder="first name" className="div_inputfield" 
                onChange={handleFirstNameInput} value={firstName} />
               <p className="p_error">{fnError}</p>
         </div>

         <div className="div_input">
         <input type="text" placeholder="last name" className="div_inputfield"  
                onChange={handleLastNameInput} value={lastName} />
                <p className="p_error">{lnError}</p>
         </div>

         <div className="div_input">
         <input type="text" placeholder="username" className="div_inputfield"  
                onChange={handleUserNameInput} value={userName} />
                <p className="p_error">{usernameError}</p>
         </div>


         <div className="div_input">
          <input type="email" placeholder="email address" className="div_inputfield"  
                 onChange={handleEmailInput} value={email} />
                 <p className="p_error">{emailError}</p>
         </div>

         <div className="div_input">
          <input type="password" placeholder="password" className="div_inputfield" 
                 onChange={handlePasswordInput} value={password} />
                 <p className="p_error">{passError}</p>
           </div>
           
         <div className="div_input">
          <input type="password" placeholder="confirm password" className="div_inputfield" 
                 onChange={handleconfirmPasswordInput} value={confirmpassword} />
                 <p className="p_error">{confirmpassError}</p>
           </div>
           
      
      <DropDownContainer>
      <p>Signup as</p>
        <DropDownHeader onClick={toggling}>
          {selectedOption || "Customer"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
         <div className="div_input">
         <button className="div_signupbutton" >Sign up</button>
         </div>
          
          <p> Log in <Link to ="/login" >here </Link> </p>
          <br />
          </form>
  </div>
 </div> 
)
}

export default Signup;