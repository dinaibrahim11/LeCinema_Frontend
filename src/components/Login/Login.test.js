import React from 'react' ;
import ReactDOM from 'react-dom' ;
import Login from './Login';
import {render, cleanup, fireEvent} from '@testing-library/react'
import store from '../../storev2/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });



afterEach(cleanup);

it("renders without crashing", ()=> {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store={store}> <Router ><Login /> </Router></Provider>, div);
})

test('testing usernameInput', () => {

const {queryByTestId} = render(<Provider store={store}> <Router ><Login /> </Router></Provider>);
const userNameInput = queryByTestId("username_input");

 fireEvent.change(userNameInput, {target: {value:"dina"}});
 expect(userNameInput.value).toBe("dina");

})

test('testing passwordInput', () => {

    const {queryByTestId} = render(<Provider store={store}> <Router ><Login /> </Router></Provider>);
    const passwordInput = queryByTestId("password_input");
    expect(passwordInput).not.toBeNull();

     fireEvent.change(passwordInput, {target: {value:"esraa-password"}});
     expect(passwordInput.value).toBe("esraa-password");
    
    })
    
test('Empty fields validation', () => {

    const {queryByTestId, getByText} = render(<Provider store={store}> <Router ><Login /> </Router></Provider>);
    const emailInput = queryByTestId("email_input");
    const passwordInput = queryByTestId("password_input");
    const LoginForm = queryByTestId("form");
    fireEvent.change(emailInput, {target: {value:""}});
    fireEvent.change(passwordInput, {target: {value:""}});
    fireEvent.submit(LoginForm);
    expect(getByText('Email is required')).toBeInTheDocument();
    expect(getByText('Password is required')).toBeInTheDocument();
})

test('Filled fields validation', () => {

    const {queryByTestId, queryByText} = render(<Provider store={store}> <Router ><Login /> </Router></Provider>);
    const emailInput = queryByTestId("email_input");
    const passwordInput = queryByTestId("password_input");
    const LoginForm = queryByTestId("form");
    fireEvent.change(emailInput, {target: {value:"test@test.test"}});
    fireEvent.change(passwordInput, {target: {value:"password-test"}});
    fireEvent.submit(LoginForm);
    expect(queryByText('Email is required')).not.toBeInTheDocument();
    expect(queryByText('Password is required')).not.toBeInTheDocument();
})



