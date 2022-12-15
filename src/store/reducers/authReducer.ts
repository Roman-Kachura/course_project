import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authApi, AuthResponseType, LoginValuesType, RegistrationValuesType} from '../../api/authApi';

const authInitialState: AuthInitialStateType = {
    isAuth: false,
    data: {} as AuthResponseType
}

export const registrationThunk = createAsyncThunk('registration', async (arg: RegistrationValuesType, thunkAPI) => {
    try {
        const user = await authApi.registration(arg);
        thunkAPI.dispatch(setState({isAuth: true, data: user.data}));
    } catch (e) {
        throw e;
    }
});

export const loginThunk = createAsyncThunk('login', async (arg: LoginValuesType, thunkAPI) => {
    try {
        const user = await authApi.login(arg);
        thunkAPI.dispatch(setState({isAuth: true, data: user.data}));
    } catch (e) {
        throw e;
    }
});

export const logoutThunk = createAsyncThunk('logout', async (arg: {id:string}, thunkAPI) => {
    try {
        await authApi.logout(arg.id);
        thunkAPI.dispatch(setState({isAuth: false, data: {}}));
    } catch (e) {
        throw e;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setState(state, action) {
            state.isAuth = action.payload.isAuth;
            state.data = action.payload.data;
        }
    }
});

const {setState} = authSlice.actions;

export default authSlice.reducer;
type AuthInitialStateType = {
    isAuth: boolean
    data: AuthResponseType
}