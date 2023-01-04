import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {reviewApi, ReviewType} from '../../api/reviewApi';
import {setAppStatus} from './appReducer';
import {getCommentsThunk} from './commentsReducer';

const showReviewInitialState: ReviewsInitialStateType = {
    item: {} as ReviewType,
    myRate: 0,
    isReset: false
}

export const getReviewsItemThunk = createAsyncThunk('get-reviews-item', async (arg: { id: string, userID?: string }, thunkAPI) => {
    try {
        const item = await reviewApi.getReviewsItem(arg.id);
        thunkAPI.dispatch(getCommentsThunk({id:arg.id}));
        if (arg.userID) {
            const rating = await reviewApi.getReviewsItemMyRating(arg.userID, arg.id);
            thunkAPI.dispatch(setMyRate(rating.data));
        }
        thunkAPI.dispatch(setReviewItem(item.data));
    } catch (e) {
        throw e;
    }
});



export const getIsRate = createAsyncThunk('get-is-rate', async (arg: { reviewID: string, userID: string }, thunkAPI) => {
    try {
        const rating = await reviewApi.getReviewsItemMyRating(arg.userID, arg.reviewID);
        thunkAPI.dispatch(setMyRate(rating.data));
    } catch (e) {
        throw e;
    }
});

export const changeRatingThunk = createAsyncThunk('change-rating', async (arg: { reviewID: string, userID: string, value: number }, thunkAPI) => {
    try {
        await reviewApi.changeReviewsItemRating(arg.reviewID, arg.userID, arg.value);
        thunkAPI.dispatch(getReviewsItemThunk({id: arg.reviewID, userID: arg.userID}));
    } catch (e) {
        throw e;
    }
});


export const deleteItemThunk = createAsyncThunk('delete-item', async (arg: { id: string, authorID: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        await reviewApi.deleteReview(arg.id, arg.authorID);
        thunkAPI.dispatch(setReviewItem({}));
    } catch (e) {
        throw e;
    }
    thunkAPI.dispatch(setAppStatus('stop'));
});

export const setIsResetThunk = createAsyncThunk('set-is-reset', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        thunkAPI.dispatch(setIsReset(false));
    } catch (e) {
        throw e;
    } finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});

export const showReviewSlice = createSlice({
    name: 'show-review',
    initialState: showReviewInitialState,
    reducers: {
        setReviewItem(state, action) {
            state.item = action.payload;
        },
        setMyRate(state, action) {
            state.myRate = action.payload;
        },
        setIsReset(state, action) {
            state.isReset = action.payload;
        }
    }
});

export const {setReviewItem, setMyRate, setIsReset} = showReviewSlice.actions;

export default showReviewSlice.reducer;
export type ReviewsInitialStateType = {
    item: ReviewType

    myRate: number
    isReset: boolean

};