import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {commentsApi, CommentType} from '../../api/commentsApi';

const commentsInitialState: CommentsInitialStateType = {
    comments: [],
    page: 1,
    count: 0,
    pagesCount: 1
};

export const messageHandlerThunk = createAsyncThunk('message-handler-thunk', async (arg: { message: string }, thunkAPI) => {
    try {
        const m = JSON.parse(arg.message);
        switch (m.method) {
            case 'connect': {
                return thunkAPI.dispatch(setComments(m.comments));
            }
            case 'create-comment': {
                return thunkAPI.dispatch(setComments(m.comments));
            }
            case 'delete-comment': {
                return thunkAPI.dispatch(setComments(m.comments));
            }
        }
    } catch (e) {
        throw e;
    }
});


export const getCommentsThunk = createAsyncThunk('get-comments', async (arg: { id: string, page: number }, thunkAPI) => {
    try {
        const comments = await commentsApi.getComments(arg.id, arg.page);
        thunkAPI.dispatch(setComments(comments.data));
    } catch (e) {
        throw e;
    }
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState: commentsInitialState,
    reducers: {
        setComments(state, action) {
            state.comments = action.payload.comments;
            state.page = +action.payload.page;
            state.pagesCount = +action.payload.pagesCount;
            state.count = action.payload.count;
        }
    },
});


const {setComments} = commentsSlice.actions;
export default commentsSlice.reducer;

type CommentsInitialStateType = {
    comments: CommentType[]
    count: number
    page: number
    pagesCount: number
}