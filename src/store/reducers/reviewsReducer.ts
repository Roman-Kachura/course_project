import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {reviewApi, ReviewResponseType, SearchType} from '../../api/reviewApi';

const reviewsInitialState: ReviewsInitialStateType = {
    reviews: [],
    currentPage: 1,
    pagesCount: 1,
    categories: [],
    sort: [],
    search: {
        sort: 'DATE DOWN',
        category: '',
        value: ''
    }
}

export const getReviewsThunk = createAsyncThunk('get-reviews', async (arg: { currentPage: number, search: SearchType }, thunkAPI) => {
    try {
        const {currentPage, search} = arg;
        const reviews = await reviewApi.getReviews(currentPage, search);
        thunkAPI.dispatch(setReviewsState(reviews.data));
    } catch (e) {
        throw e;
    }
});

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: reviewsInitialState,
    reducers: {
        setReviewsState(state, action) {
            const {reviews, currentPage, pagesCount, categories, sort, search} = action.payload;
            state.reviews = reviews;
            state.currentPage = currentPage;
            state.pagesCount = pagesCount;
            state.categories = categories;
            state.sort = sort;
            state.search = search;
            if (search.hashtags) {
                state.search = {
                    sort: search.sort,
                    category: search.category,
                    value: `#${search.hashtags}`
                }
            }
        }
    }
});

const {setReviewsState} = reviewsSlice.actions;

export default reviewsSlice.reducer;
export type ReviewsInitialStateType = ReviewResponseType;