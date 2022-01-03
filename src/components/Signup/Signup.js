import React, { useState } from 'react'
import classes from './Signup.module.css'
import {Link} from 'react-router-dom'
import { Redirect } from "react-router-dom";
import API from '../../fakeAPI';
import { useDispatch } from 'react-redux';
import { usersActions } from '../../storev2/users-slice';
import styled from 'styled-components';


/**
 * Signup new user
 * @author 
 * @async
 * @example <Signup />
 * @returns {element} The sign up form contents
 * 
 */
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

  const [redirect, setRedirect] = useState(null);

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');

  const [isChecked, setIsChecked] = useState('false');

  const [fnError, setfnError] = useState();
  const [lnError, setlnError] = useState();
  const [usernameError, setusernameError] = useState('');
  const [emailError, setemailError] = useState();
  const [passError, setpassError] = useState();
  const [confirmpassError, setconfirmpassError] = useState();
  const [errorcount, setErrorCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  const [isSubmitting, setisSubmitting] = useState(false);

  /**
   * Handles what happens when form is submitted
   * 
   * @param {object} e - the JavaScript event object
   */
  const handleSubmit = (e) => {
      e.preventDefault();
      setisSubmitting(true);
      // checkUserInput();
      // validateInfo();
      // postDataHandler();
      // submitForm();
      signUpUser();
  }   

  /**
   *  Checks if all inputs are valid, then user will be registered and will be redirected to another form
   *  that shows the user a message to check his/her email for confirmation 
   */
  const submitForm = () => {
    if(emailError=='' && passError=='' && confirmpassError=='' && fnError=='' && lnError=='' && usernameError=='') {
      setRedirect("/post-signup");
    }
  }

  // ------------------------------------- json server -------------------------------------------//

  /**
   * Checks the availability of the email, if it's already in the fakeAPI, function will return 'Email unavailable'
   * It's considered to be part of the email validation, but it's written in a separate function since it has different logic than other validations 
   * & depends on the server 
   */
  const checkUserInput = () => {
    API.get('users?email=' + email)
    .then(response => {
      console.log(response.data);
      if(response.data.length > 0) {
        setemailError('Email already resistered try looging in instead');
      }
    })
  }

  /**
   * Responsible for posting/recording the data inputted by the user in the fakeAPI, but it checks first if all inputs are valid 
   * 
   */
  const postDataHandler = () => {
  if(emailError==='' && passError===''&& confirmpassError==='' && usernameError==='' && fnError==='' && lnError===''){
    const userInfo = {
      firstname : firstName,
      lastname: lastName,
      userName: userName,
      emailaddress: email,
      password: password 
    }
    API.post('users', userInfo)      //json server
    .then(response => {
    console.log(response)
  })
  }
  }

  //---------------------------------------- HANDLING INPUTS ---------------------------------------//
  // ** Handling input functions also contain validations to provide instant validation on typing ** //

  //First Name
  const handleFirstNameInput = (e) => {
  setFirstname(e.target.value);

  if(e.target.value) 
  {setfnError(''); setErrorCount(0)}
  else {
    setfnError('First name required')
  }
  }

  //Last Name
  const handleLastNameInput = (e) => {
  setLastname(e.target.value); 

  if(e.target.value) 
  {setlnError(''); setErrorCount(0)}
  else {
    setlnError('Last name required')
  }
  }

  const handleUserNameInput = (e) => {
    setuserName(e.target.value); 
  
    if(e.target.value) 
    {setusernameError(''); setErrorCount(0)}
    else {
      setusernameError('Username required')
    }
    }
  
  //Email
  const handleEmailInput = (e) => {
  setEmail(e.target.value);  
  // API.get('users?email=' + e.target.value )
  // .then(response => {
  //   console.log(response.data);
  //   if(response.data.length > 0) {
  //     setemailError('Email unavailable');
  //   }
  // })

  if(!e.target.value){
    setemailError('Email is required');
    setErrorCount(1);
  }
  else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
    setemailError('Email address is invalid');
    setErrorCount(1);
  }
  else {setemailError(''); setErrorCount(0)}
  }

  //Password
  const handlePasswordInput = (e) => {
  setPassword(e.target.value);

  if(!e.target.value){
    setpassError('Password is required');
    setErrorCount(1);
  } else if (e.target.value.length < 12) {
    setpassError('Password should be 12 characters or more');
    setErrorCount(1);
  } else {setpassError(''); setErrorCount(0)}
  }
  const handleconfirmPasswordInput = (e) => {
    setconfirmPassword(e.target.value);
  
    if(!e.target.value){
      setconfirmpassError('Confirm Password is required');
      setErrorCount(1);
    } else if (e.target.value !== password) {
      setconfirmpassError('Confirm Password should be 12 characters or more');
      setErrorCount(1);
    } else {setconfirmpassError(''); setErrorCount(0)}
    }
  

  
  const signUpUser = () => {
    setisSubmitting(true);
    let totalErrorCount = 0;
    setfnError(''); 
    setErrorCount(0);
    setlnError('');
    setusernameError('');
    setemailError('');
    setpassError(''); 
    setconfirmpassError('');
    /**
     * Insures that all input data is valid
     * This is what provides instant validation on submiiting the form
     */
    //First name
    if(!firstName) {
      setfnError('First name is required');
      setErrorCount(1);
      totalErrorCount++;
    } else{setfnError(''); setErrorCount(0)}

    //Last name
    if(!lastName) {
        setlnError('Last name is required');
        setErrorCount(1);
        totalErrorCount++;
    } else{setlnError(''); setErrorCount(0)}

    //User name
    if(!userName) {
      setusernameError('Username is required');
      setErrorCount(1);
      totalErrorCount++;
  } else{setusernameError(''); setErrorCount(0)}

    //Email
    if(!email){
        setemailError('Email is required');
        setErrorCount(1);
        totalErrorCount++;
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
        setemailError('Email address is invalid');
        setErrorCount(1);
        totalErrorCount++;
    }
    else {setemailError(''); setErrorCount(0)}

    //Password
    if(!password){
        setpassError('Password is required');
        setErrorCount(1);
        totalErrorCount++;
    } else if (password.length < 12) {
        setpassError('Password should be 12 characters or more');
        setErrorCount(1);
        totalErrorCount++;
    } else {
      if (checkGoodPassword(password)){
        setpassError(''); 
        setErrorCount(0);
      } else {
        setpassError('Password is weak, should have uppercase, lowercase, and digit');
        setErrorCount(1);
        totalErrorCount++;
      }
    }

    console.log("total error count: "+totalErrorCount);
    if (totalErrorCount > 0) {
      //alert("cannot");
      return;
    }

    // alert("could");
    /**
     * Responsible for posting/recording the data inputted by the user to the server, but it checks first if all inputs are valid 
     * 
     */
     if(emailError==='' && passError==='' && confirmpassError==='' && usernameError==='' && fnError==='' && lnError===''){
      const userInfo = {
        firstName : firstName,
        lastName: lastName,
        displayName: email.split("@")[0],
        userName: userName,
        email: email,
        password: password 
       }
        API.post('user/sign-up', userInfo)      //json server
          .then(res => {
            console.log(res);
            if (res.data.status === "success") {
              //alert("signup is correct");
              dispatch(usersActions.login({
                email: email, 
                password: password, 
                userId: res.data.data.user._id,
                token: res.data.token,
                displayName: res.data.data.user.displayName,
                firstName: res.data.data.user.firstName,
                lastName: res.data.data.user.lastName
              }));
              //setisSubmitting(false);
              // TODO: change to email confirmation screen
              setRedirect("/home");
            } 
      })
      .catch(err => {
        console.log(err.response);
        console.log(err.response.data.status);
       
        if (err.response.data.status === "fail") {
          //alert("status 400");
          if (err.response.data.message.toString().includes("Duplicate")) {
            setemailError("duplicate email found");
          }
          //setpassError(err.response.data.message);
          setisSubmitting(false);
        } 
      })
    }

  }


    const checkGoodPassword = (str) => {
      let acceptable = false;
      let upperCaseGood = false;
      let digitGood = false;
      let lowerCaseGood = false;
      let specialGood = false;
      for (let i = 0; i < str.length; i++) {
        let character = str.charAt(i);
        if (!isNaN(character * 1)){
          digitGood = true;
        }else{
          if (character == character.toUpperCase()) {
              upperCaseGood = true;
          }
          if (character == character.toLowerCase()){
              lowerCaseGood = true;
          }
      }
      }
      
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (format.test(str)) {
        specialGood = true;
      }

      return (upperCaseGood && lowerCaseGood && digitGood && specialGood);
    }

    const checkStrongPassword = (pswd) => {
      var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      alert(pswd);
      if(pswd.toString().match(decimal)) 
      { 
      alert('Correct, try another...')
      return true;
      } else {
        alert("so weakkk");
        return false;
      }
    }

// ---------------------------------------- VALIDATIONS ---------------------------------------------- //
// **Beside the validations written inside handling functions, we also need separate validation function ** //

/**
 * Insures that all input data is valid
 * This is what provides instant validation on submiiting the form
 */
 const validateInfo = () => {

    //First name
    if(!firstName) {
        setfnError('First name is required');
        setErrorCount(1);
    } else{setfnError(''); setErrorCount(0)}

    //Last name
    if(!lastName) {
        setlnError('Last name is required');
        setErrorCount(1);
    } else{setlnError(''); setErrorCount(0)}
    if(!userName) {
      setusernameError('Last name is required');
      setErrorCount(1);
  } else{setusernameError(''); setErrorCount(0)}

    //Email
    if(!email){
        setemailError('Email is required');
        setErrorCount(1);
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
        setemailError('Email address is invalid');
        setErrorCount(1);
    }
    else {setemailError(''); setErrorCount(0)}

    //Password
    if(!password){
        setpassError('Password is required');
        setErrorCount(1);
    } else if (password.length < 12) {
        setpassError('Password should be 12 characters or more');
        setErrorCount(1);
    } else {setpassError(''); setErrorCount(0)}

} 
 
// ------------------------------------------ RETURN -------------------------------------------------- //

if(redirect) {
  return (
    <Redirect to={redirect} />
  )
}

return (

  <div className="page"  data-testid="signup">
 <div  className={classes.div__signup_page}>

    <form className={classes.form__signup_page} onSubmit={handleSubmit} data-testid="form">
         <h5 className={classes.center}> Signup to leCinema</h5>

         <div className={classes.div__input}>
         <input type="text" placeholder="First name" className={classes.div__inputfield} id="signup-first-name-field" data-testid="fname"
                onChange={handleFirstNameInput} value={firstName} />
               <p className={classes.p__error}>{fnError}</p>
         </div>

         <div className={classes.div__input}>
         <input type="text" placeholder="Last name" className={classes.div__inputfield} id="signup-last-name-field" data-testid="lname"
                onChange={handleLastNameInput} value={lastName} />
                <p className={classes.p__error}>{lnError}</p>
         </div>

         <div className={classes.div__input}>
         <input type="text" placeholder="Username" className={classes.div__inputfield} id="signup-user-name-field" 
                onChange={handleUserNameInput} value={userName} />
                <p className={classes.p__error}>{usernameError}</p>
         </div>


         <div className={classes.div__input}>
          <input type="email" placeholder="Email address" className={classes.div__inputfield} id="signup-email-field" data-testid="email"
                 onChange={handleEmailInput} value={email} />
                 <p className={classes.p__error}>{emailError}</p>
         </div>

         <div className={classes.div__input}>
          <input type="password" placeholder="Password" className={classes.div__inputfield} id="signup-pssword-field" data-testid="password"
                 onChange={handlePasswordInput} value={password} />
                 <p className={classes.p__error}>{passError}</p>
           </div>
           
         <div className={classes.div__input}>
          <input type="password" placeholder="Confirm Password" className={classes.div__inputfield} id="signup-confirmpssword-field" 
                 onChange={handleconfirmPasswordInput} value={password} />
                 <p className={classes.p__error}>{confirmpassError}</p>
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
    

         <div className={classes.div__input}>
         <button className={classes.div_signupbutton} id="signup-btn" data-testid="button">Sign up</button>
         </div>
          
          <p> Log in <Link to ="/login" id="login-here-link">here </Link> </p>
          <br />
          </form>
  </div>
 </div> 
)
}

export default Signup;