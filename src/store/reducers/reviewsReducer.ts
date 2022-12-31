import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {reviewApi, ReviewResponseType, SearchType} from '../../api/reviewApi';
import {CreateReviewValuesType} from '../../components/c2-main/m0-reviews/CreateReviewForm';
import {setIsReset} from './showReviewReducer';
import {setAppStatus} from './appReducer';
import {getCategoriesThunk} from './categoriesReducer';

const reviewsInitialState: ReviewsInitialStateType = {
    reviews: [],
    currentPage: 1,
    pagesCount: 1,
    sort: [],
    search: {
        sort: 'DATE DOWN',
        category: '',
        value: ''
    },
}

export const getReviewsThunk = createAsyncThunk('get-reviews', async (arg: { currentPage: number, search: SearchType }, thunkAPI) => {
    try {
        const {currentPage, search} = arg;
        const reviews = await reviewApi.getReviews(currentPage, search);
        thunkAPI.dispatch(setReviewsState(reviews.data));
        thunkAPI.dispatch(getCategoriesThunk());
    } catch (e) {
        throw e;
    }
});

export const createReviewThunk = createAsyncThunk('create-review', async (arg: { form: FormData, values: CreateReviewValuesType }, thunkAPI) => {
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

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: reviewsInitialState,
    reducers: {
        setReviewsState(state, action) {
            const {reviews, currentPage, pagesCount, categories, sort, search} = action.payload;
            state.reviews = reviews;
            state.currentPage = currentPage;
            state.pagesCount = pagesCount;
            state.sort = sort;
            state.search = search;
            if (search.hashtags) {
                state.search = {
                    sort: search.sort,
                    category: search.category,
                    value: `#${search.hashtags}`
                }
            }
        },
    }
});

const {setReviewsState} = reviewsSlice.actions;

export default reviewsSlice.reducer;
export type ReviewsInitialStateType = ReviewResponseType;