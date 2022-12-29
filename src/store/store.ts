import {configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/authReducer';
import {useDispatch} from 'react-redux';
import usersReducer from './reducers/usersReducer';
import reviewReducer from './reducers/reviewsReducer';
import showReviewReducer from './reducers/showReviewReducer';

export const setLimitForStorage = () => {
    const limit = 24 * 60 * 1000;
    const localStorageInitTime = Number(localStorage.getItem('localStorageInitTime'));
    if (localStorageInitTime === null) {
        localStorage.setItem('localStorageInitTime', (+new Date()).toString());
    } else if (+new Date() - localStorageInitTime > limit)
        localStorage.clear();
    localStorage.setItem('localStorageInitTime', (+new Date()).toString());
}
const loadedState = () => {
    setLimitForStorage()
    const state = localStorage.getItem('app');
    if (state) {
        return JSON.parse(state.toString())
    } else {
        return null;
    }
}


export const store = configureStore({
    reducer: {
        authReducer,
        usersReducer,
        reviewReducer,
        showReviewReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
    preloadedState: loadedState() || {}
});

store.subscribe(() => {
    const state = JSON.stringify(store.getState());
    localStorage.setItem('app', state);
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;