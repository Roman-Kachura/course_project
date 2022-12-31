import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authApi, AuthResponseType, LoginValuesType, RegistrationValuesType} from '../../api/authApi';
import {setAppStatus} from './appReducer';

const authInitialState: AuthInitialStateType = {
    isAuth: false,
    data: {} as AuthResponseType
}

export const registrationThunk = createAsyncThunk('registration', async (arg: RegistrationValuesType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const user = await authApi.registration(arg);
        thunkAPI.dispatch(setState({isAuth: true, data: user.data}));
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