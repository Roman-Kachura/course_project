import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UserResponseType} from '../../api/authApi';
import {usersApi} from '../../api/usersApi';

const usersInitialState: UserInitialStateType = {
    users: [] as UserResponseType[],
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
    currentPage:number
    pagesCount:number
}