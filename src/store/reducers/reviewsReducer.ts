import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {reviewApi, ReviewResponseType, ReviewType, SearchType} from '../../api/reviewApi';

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
    },
    item: {} as ReviewType
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
export const getReviewsItemThunk = createAsyncThunk('get-reviews-item', async (arg: { id: string }, thunkAPI) => {
    try {
        const item = await reviewApi.getReviewsItem(arg.id);
        console.log(item)
        thunkAPI.dispatch(setItem(item.data));
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
            state.item = {} as ReviewType;
            if (search.hashtags) {
                state.search = {
                    sort: search.sort,
                    category: search.category,
                    value: `#${search.hashtags}`
                }
            }
        },
        setItem(state, action) {
            state.item = action.payload;
        }
    }
});

const {setReviewsState, setItem} = reviewsSlice.actions;

export default reviewsSlice.reducer;
export type ReviewsInitialStateType = ReviewResponseType & {
    item: ReviewType
};