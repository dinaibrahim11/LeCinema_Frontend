import { configureStore, createStore } from '@reduxjs/toolkit';
import usersSlice from './users-slice';
import { loadState, saveState } from './localStorage';
import { throttle } from 'lodash';



const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
    },
    preloadedState: loadState()
});

store.subscribe(
    throttle(() => saveState(store.getState()), 1000)
);

export default store;