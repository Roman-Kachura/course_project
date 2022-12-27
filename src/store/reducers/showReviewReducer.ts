import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {reviewApi, ReviewType} from '../../api/reviewApi';
import {AuthorType, commentsApi, CommentType} from '../../api/commentsApi';
import {usersApi} from '../../api/usersApi';

const showReviewInitialState: ReviewsInitialStateType = {
    item: {} as ReviewType,
    comments: [],
    author: {} as AuthorType,
    isRate: false
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

export const getAuthorForComment = createAsyncThunk('get-author-comment', async (arg: { id: string }, thunkAPI) => {
    try {
        const author = await usersApi.getUser(arg.id);
        const {id, name, photo} = author.data;
        thunkAPI.dispatch(setAuthor({id, name, photo}));
    } catch (e) {
        throw e;
    }
});

export const getIsRate = createAsyncThunk('get-is-rate', async (arg: { reviewID: string, userID: string }, thunkAPI) => {
    try {
        const rating = await reviewApi.getReviewsItemRating(arg.userID, arg.reviewID);
        thunkAPI.dispatch(setRating(rating.data));
    } catch (e) {
        throw e;
    }
});

export const changeRatingThunk = createAsyncThunk('change-rating', async (arg: { reviewID: string, userID: string, value: number }, thunkAPI) => {
    try {
        const rating = await reviewApi.changeReviewsItemRating(arg.reviewID, arg.userID, arg.value);
    } catch (e) {
        throw e;
    }
});

export const clearReviewsItemThunk = createAsyncThunk('clear-review-item', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setRating(showReviewInitialState));
    } catch (e) {
        throw e;
    }
});

export const showReviewSlice = createSlice({
    name: 'show-review',
    initialState: showReviewInitialState,
    reducers: {
        setReviewItem(state, action) {
            state.item = action.payload;
        },
        setReviewComment(state, action) {
            state.comments = action.payload;
        },
        setAuthor(state, action) {
            state.author = action.payload;
        },
        setRating(state, action) {
            state.isRate = action.payload;
        }
    }
});

const {setReviewItem, setReviewComment, setAuthor, setRating} = showReviewSlice.actions;

export default showReviewSlice.reducer;
export type ReviewsInitialStateType = {
    item: ReviewType
    comments: CommentType[]
    author: AuthorType

    isRate: boolean
};