import {configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/authReducer';
import {useDispatch} from 'react-redux';
import usersReducer from './reducers/usersReducer';

const loadedState = () => {
    const state = localStorage.getItem('app');
    if (state) {
        return JSON.parse(state.toString())
    } else {
        return null;
    }
}
export const store = configureStore({
    reducer: {
        auth: authReducer,
        users:usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
    preloadedState: loadedState()
});

store.subscribe(() => {
    const state = JSON.stringify(store.getState());
    localStorage.setItem('app', state);
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;