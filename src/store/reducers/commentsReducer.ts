import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setAppStatus} from './appReducer';
import {commentsApi, CommentType, DeleteCommentValuesType} from '../../api/commentsApi';

const commentsInitialState: CommentsInitialStateType = {
    comments: [],
};

export const createCommentThunk = createAsyncThunk('create-comment-thunk', async (arg: { reviewID: string, authorID: string, text: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const comment = await commentsApi.createComment(arg);
    } catch (e) {
        throw e;
    } finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});

export const getCommentsThunk = createAsyncThunk('get-comments', async (arg: { id: string }, thunkAPI) => {
    try {
        const comments = await commentsApi.getComments(arg.id);
        console.log(comments.data);
        thunkAPI.dispatch(setComments(comments.data));
    } catch (e) {
        throw e;
    }
});

export const deleteCommentThunk = createAsyncThunk('get-comments', async (arg: DeleteCommentValuesType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const comments = await commentsApi.deleteComment(arg);
    } catch (e) {
        throw e;
    } finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});


const commentsSlice = createSlice({
    name: 'comments',
    initialState: commentsInitialState,
    reducers: {
        setComments(state, action) {
            state.comments = action.payload;
        }
    },
});


const {setComments} = commentsSlice.actions;
export default commentsSlice.reducer;

type CommentsInitialStateType = {
    comments: CommentType[]
}