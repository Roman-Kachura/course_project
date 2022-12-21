import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {reviewApi, ReviewResponseType} from '../../api/reviewApi';

const reviewsInitialState: ReviewsInitialStateType = {
    reviews: [],
    currentPage: 1,
    pagesCount: 1
}

export const getReviewsThunk = createAsyncThunk('get-reviews', async (arg, thunkAPI) => {
    try {
        const reviews = await reviewApi.getReviews();
        thunkAPI.dispatch(setReviewsState(reviews.data));
    } catch (e) {
        console.log(e)
        throw e;
    }
});

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: reviewsInitialState,
    reducers: {
        setReviewsState(state, action) {
            const {reviews, currentPage, pagesCount} = action.payload;
            state.reviews = reviews;
            state.currentPage = currentPage;
            state.pagesCount = pagesCount;
        }
    }
});

const {setReviewsState} = reviewsSlice.actions;

export default reviewsSlice.reducer;
export type ReviewsInitialStateType = ReviewResponseType