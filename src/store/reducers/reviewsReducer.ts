import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {reviewApi, ReviewType, SearchType} from '../../api/reviewApi';
import {setIsReset} from './showReviewReducer';
import {setAppStatus} from './appReducer';
import {getCategoriesThunk} from './categoriesReducer';
import {setSearchParams} from './searchReducer';

const reviewsInitialState: ReviewsInitialStateType = {
    reviews: [],
    currentPage: 1,
    pagesCount: 1,
    sort: ['DATE UP', 'DATE DOWN', 'RATING UP', 'RATING DOWN'],
}

export const getReviewsThunk = createAsyncThunk('get-reviews', async (arg: { currentPage: number, search: SearchType }, thunkAPI) => {
    try {
        const {currentPage, search} = arg;
        const reviews = await reviewApi.getReviews(currentPage, search);
        thunkAPI.dispatch(setReviewsState(reviews.data));
        thunkAPI.dispatch(setSearchParams(reviews.data.search));
        thunkAPI.dispatch(getCategoriesThunk());
    } catch (e) {
        throw e;
    }
});

export const createReviewThunk = createAsyncThunk('create-review', async (arg: { form: FormData }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        await reviewApi.createReview(arg.form);
        thunkAPI.dispatch(setIsReset(true));
        thunkAPI.dispatch(setAppStatus('stop'));
    } catch (e) {
        thunkAPI.dispatch(setAppStatus('stop'));
        throw e;
    }
});

export const editReviewThunk = createAsyncThunk('edit-review', async (arg: { form: FormData }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        await reviewApi.editReview(arg.form);
        thunkAPI.dispatch(setIsReset(true));
        thunkAPI.dispatch(setAppStatus('stop'));
    } catch (e) {
        thunkAPI.dispatch(setAppStatus('stop'));
        throw e;
    }
});

export const changeReviewTextThunk = createAsyncThunk('change-review-text', async (arg: { id: string, authorID: string, value: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        await reviewApi.changeText(arg);
        thunkAPI.dispatch(setAppStatus('stop'));
    } catch (e) {
        thunkAPI.dispatch(setAppStatus('stop'));
        throw e;
    }
});

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: reviewsInitialState,
    reducers: {
        setReviewsState(state, action) {
            const {reviews, currentPage, pagesCount, sort} = action.payload;
            state.reviews = reviews;
            state.currentPage = currentPage;
            state.pagesCount = pagesCount;
            state.sort = sort;
        }
    }
});

export const {setReviewsState} = reviewsSlice.actions;

export default reviewsSlice.reducer;
export type ReviewsInitialStateType = {
    reviews: ReviewType[],
    currentPage: number,
    pagesCount: number,
    sort: string[],
};