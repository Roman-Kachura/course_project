import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UserResponseType} from '../../api/authApi';
import {usersApi} from '../../api/usersApi';
import {setAppStatus} from './appReducer';
import {setUserAction} from './authReducer';

const usersInitialState: UserInitialStateType = {
    users: [] as UserResponseType[],
    currentPage: 1,
    pagesCount: 1
}

export const getUsersThunk = createAsyncThunk('get-users', async (arg: { currentPage: number }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const users = await usersApi.getUsers(arg.currentPage);
        thunkAPI.dispatch(setUsersState(users.data));
    } catch (e) {
        throw e;
    } finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});
export const clearUsersThunk = createAsyncThunk('clear-users', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUsersState(usersInitialState));
    } catch (e) {
        throw e;
    }
});

export const changeUserData = createAsyncThunk('change-user-data', async (arg: { form: FormData }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const user = await usersApi.changeUserData(arg.form);
        thunkAPI.dispatch(setUserAction(user.data));
    } catch (e) {
        throw e;
    } finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {
        setUsersState(state, action) {
            state.users = action.payload.users;
            state.currentPage = +action.payload.currentPage;
            state.pagesCount = action.payload.pagesCount;
        }
    }
});

const {setUsersState} = usersSlice.actions;

export default usersSlice.reducer;
export type UserInitialStateType = {
    users: UserResponseType[]
    currentPage: number
    pagesCount: number
}