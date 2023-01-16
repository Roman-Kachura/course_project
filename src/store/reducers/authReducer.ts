import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authApi, AuthResponseType, LoginValuesType, RegistrationValuesType} from '../../api/authApi';
import {setAppStatus} from './appReducer';
import {
    getAuth,
    getRedirectResult,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider
} from 'firebase/auth';


const authInitialState: AuthInitialStateType = {
    isAuth: false,
    data: {} as AuthResponseType
}

export const registrationThunk = createAsyncThunk('registration', async (arg: { name: string, password: string, email: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const auth = getAuth();
        const credentials = await createUserWithEmailAndPassword(auth, arg.email, arg.password);
        const {uid} = credentials.user;
        if (uid) {
            const result = await authApi.registration({...arg, uid});
            thunkAPI.dispatch(setState({isAuth: true, data: result.data}));
        }
    } catch (e) {
        throw e;
    } finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});

export const authWithGoogleThunk = createAsyncThunk('auth-with-google', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const {displayName, email, photoURL, uid} = result.user;
        if(displayName && email && photoURL){
            const user = await authApi.social({displayName, email, photoURL, uid});
            thunkAPI.dispatch(setState({isAuth: true, data: user.data}));
        }
    } catch (e) {
        throw e;
    } finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});

export const authWithFacebookThunk = createAsyncThunk('auth-with-facebook', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const {displayName, email, photoURL, uid} = result.user;
        if(displayName && email && photoURL){
            const user = await authApi.social({displayName, email, photoURL, uid});
            thunkAPI.dispatch(setState({isAuth: true, data: user.data}));
        }
    } catch (e) {
        throw e;
    } finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});

export const loginThunk = createAsyncThunk('login', async (arg: LoginValuesType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const user = await authApi.login(arg);
        thunkAPI.dispatch(setState({isAuth: true, data: user.data}));
    } catch (e) {
        throw e;
    } finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});

export const logoutThunk = createAsyncThunk('logout', async (arg: { id: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        await authApi.logout(arg.id);
        thunkAPI.dispatch(setState({isAuth: false, data: {}}));
    } catch (e) {
        throw e;
    } finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setState(state, action) {
            state.isAuth = action.payload.isAuth;
            state.data = action.payload.data;
        },
        setUserAction(state, action) {
            state.data.user = action.payload;
        }
    }
});

export const {setState, setUserAction} = authSlice.actions;

export default authSlice.reducer;
type AuthInitialStateType = {
    isAuth: boolean
    data: AuthResponseType
}