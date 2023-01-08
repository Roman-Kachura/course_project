import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UserResponseType} from '../../api/authApi';
import {usersApi} from '../../api/usersApi';
import {reviewApi, ReviewType} from '../../api/reviewApi';

const usersInitialState: ProfileInitialStateType = {
    user: {} as UserResponseType,
    ratedReviews: [] as ReviewType[],
    currentPage: 1,
    pagesCount: 1,
    sort: 'DATE UP',
    category: ''
}

export const getOneUserThunk = createAsyncThunk('get-one-user', async (arg: { id: string }, thunkAPI) => {
    try {
        const user = await usersApi.getUser(arg.id);
        thunkAPI.dispatch(setShowUser(user.data));
    } catch (e) {
        throw e;
    }
});

export const getRatedReviewsThunk = createAsyncThunk('get-rated-reviews', async (arg: { id: string, currentPage: number, sort: string, category: string }, thunkAPI) => {
    try {
        const reviews = await reviewApi.getRatedReviews(arg);
        thunkAPI.dispatch(setProfileState(reviews.data));
    } catch (e) {
        throw e;
    }
});


const profileSlice = createSlice({
    name: 'profile',
    initialState: usersInitialState,
    reducers: {
        setShowUser(state, action) {
            state.user = action.payload;
        },
        setProfileState(state, action) {
            state.currentPage = action.payload.currentPage;
            state.pagesCount = action.payload.pagesCount;
            state.ratedReviews = action.payload.reviews;
        }
    }
});

const {setShowUser, setProfileState} = profileSlice.actions;

export default profileSlice.reducer;
export type ProfileInitialStateType = {
    user: UserResponseType
    ratedReviews: ReviewType[]
    currentPage: number
    pagesCount: number
    sort: string,
    category: string
}