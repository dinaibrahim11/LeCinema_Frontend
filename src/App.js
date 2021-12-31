import React from 'react'; 
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import Home from './pages/Home/Home';
import ResetPassword from './components/ResetPassword/ResetPassword'
import ResetPasswordSuccess from './components/ResetPasswordSuccess/ResetPasswordSuccess'
import ForgetPasswordSuccess from './components/ForgetPasswordSuccess/ForgetPasswordSuccess';
import Signup from './components/Signup/Signup';
import FormSuccess from './components/FormSuccess/FormSuccess';

const App = () => {
 
  return (
    <BrowserRouter>
      <div className="App">
      <Header />
      
      {/*<Main />*/}
      {/* <Switch>

      <Route exact path="/" component={Welcome} />
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/post-signup" component={FormSuccess} />
      <Route path="/forgotpassword" component={ForgetPassword} />
      <Route path="/post-forgotpassword" component={ForgetPasswordSuccess} />
      <Route path="/forgotpassword-confirm" component={ResetPassword} />
      <Route path="/post-forgotpassword-confirm" component={ResetPasswordSuccess} />
      <Route path="/home" component={Home} /> 

      </Switch> */}
      <Main />

    </div>
    {/*<Header />
        <Main />
      </div>*/}
    </BrowserRouter>
    

  );
}

export default App;
