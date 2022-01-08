import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_USERS_URL = "https://jsonplaceholder.typicode.com/users";
//const FIREBASE_ENDPOINT = 'https://react-http-23f9c-default-rtdb.firebaseio.com';


const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState({
    currentUser: {
        id: null,
        userId: 1,
        token: null,
        firstName: null,
        lastName: null,
        username: 'Ahmed',
        isLoggedIn: false, // TODO: set to false before integration
        email: null,
        password: null, //TODO: check if the actual password is stored or an encrypted form of it
        confirmpassword: null
    },
    currentSearchQuery: '',
    status: 'idle', //whether loading or not 
    error: null
})

// getUserInfo
// /users/:id
export const getUserInfo = createAsyncThunk("user/fetchUserById", 
    async (userId) => {
        const response = await axios.get(`${BASE_USERS_URL}/${userId}`);
        return response.data;
    }
);

export const signin = createAsyncThunk("user/signin",
    
);

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        login(state, action) {
            const { email, password, userId, token,  firstName, lastName } = action.payload;
            state.currentUser.email = email;
            state.currentUser.password = password;
            state.currentUser.isLoggedIn = true;
            state.currentUser.userId = userId;
            state.currentUser.id = userId;
            state.currentUser.token = token;
            state.currentUser.firstName = firstName;
            state.currentUser.lastName = lastName;
            let user = {
                email: email, 
                password: password, 
                userId: userId, 
                isLoggedIn: true, 
                id: userId,
                token: token,
                firstName: firstName,
                lastName: lastName
            };
            localStorage.setItem('currentUser',JSON.stringify(user));
        },
        logout(state, action) {
            state.currentUser.userId = null;
            state.currentUser.token = null;
            state.currentUser.isLoggedIn = false;
            state.currentUser.userId = null;
            state.currentUser.id = null;
            state.currentUser.token = null;
            state.currentUser.firstName = null;
            state.currentUser.lastName = null;
            localStorage.removeItem('currentUser');
        },



        signup(state, action) {
            const { email, password, userId, token, firstName, lastName, confirmpassword } = action.payload;
            let user = {
                email: email, 
                password: password, 
                userId: userId, 
                isLoggedIn: true, 
                id: userId,
                token: token,
                firstName: firstName,
                lastName: lastName,
                confirmpassword: confirmpassword
            };
            localStorage.setItem('currentUser',JSON.stringify(user));
        },
    },
    extraReducers: {
        [getUserInfo.pending]: (state, action) => {
            state.status = "loading";
        },
        [getUserInfo.fulfilled]: (state, action) => {
            state.status = "succeeded";
            // CANNOT DO: state.entities.push(action.payload) XXXXX
            //return action.payload;
            usersAdapter.addOne(state, action.payload);
        },
        [getUserInfo.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
});

export const usersActions = usersSlice.actions;

export default usersSlice;