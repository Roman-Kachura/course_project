import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UserResponseType} from '../../api/authApi';
import {usersApi} from '../../api/usersApi';

const usersInitialState: UserInitialStateType = {
    data: [] as UserResponseType[],
    currentPage:1,
    pagesCount:1
}

export const getUsersThunk = createAsyncThunk('get-users', async (arg:{currentPage:number}, thunkAPI) => {
    try{
        const users = await usersApi.getUsers(arg.currentPage);
        thunkAPI.dispatch(setUsersState(users.data));
    }catch (e) {
        throw e;
    }
});

const authSlice = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {
        setUsersState(state, action) {
            state.data = action.payload.users;
            state.currentPage = +action.payload.currentPage;
            state.pagesCount = action.payload.pagesCount;
        }
    }
});

const {setUsersState} = authSlice.actions;

export default authSlice.reducer;
export type UserInitialStateType = {
    data: UserResponseType[]
    currentPage:number
    pagesCount:number
}