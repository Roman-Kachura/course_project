import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {reviewApi, ReviewType} from '../../api/reviewApi';
import {commentsApi, CommentType} from '../../api/commentsApi';

const showReviewInitialState: ReviewsInitialStateType = {
    item: {} as ReviewType,
    comments: []
}

export const getReviewsItemThunk = createAsyncThunk('get-reviews-item', async (arg: { id: string }, thunkAPI) => {
    try {
        const item = await reviewApi.getReviewsItem(arg.id);
        thunkAPI.dispatch(setReviewItem(item.data));
    } catch (e) {
        throw e;
    }
});

export const getReviewsCommentsThunk = createAsyncThunk('get-reviews-comments', async (arg: { id: string }, thunkAPI) => {
    try {
        const comments = await commentsApi.getComments(arg.id);
        thunkAPI.dispatch(setReviewComment(comments.data));
    } catch (e) {
        throw e;
    }
});

const showReviewSlice = createSlice({
    name: 'show-review',
    initialState: showReviewInitialState,
    reducers: {
        setReviewItem(state, action) {
            state.item = action.payload;
        },
        setReviewComment(state, action) {
            state.comments = action.payload;
        }
    }
});

const {setReviewItem, setReviewComment} = showReviewSlice.actions;

export default showReviewSlice.reducer;
export type ReviewsInitialStateType = {
    item: ReviewType
    comments: CommentType[]
};