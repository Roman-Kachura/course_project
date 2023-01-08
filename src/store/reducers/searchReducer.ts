import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchApi} from '../../api/searchApi';

const initialState: SearchListInitialStateType = {
    list: [],
    params: {
        sort: 'DATE DOWN',
        category: '',
        value: ''
    }
}

export const getSearchListThunk = createAsyncThunk('get-search-list', async (arg: { value: string }, thunkAPI) => {
    try {
        const helpText = await searchApi.getHelpText(arg.value);
        thunkAPI.dispatch(setSearchList(helpText.data));
    } catch (e) {
        throw e;
    }
});

export const setSearchParamsThunk = createAsyncThunk('set-params', async (arg: { value: string }, thunkAPI) => {
    const arr = ['abc', 'cbc', 'item', '#dep', '#lept', 'hhh'];
    const arr2 = arr.filter(f => f.indexOf(arg.value) > -1)
    thunkAPI.dispatch(setSearchList(arr2));
});

const searchReducer = createSlice({
    name: 'search-slice',
    initialState,
    reducers: {
        setSearchList(state, action) {
            state.list = action.payload;
        },
        setSearchParams(state, action) {
            const {hashtags, category, sort} = action.payload;
            state.params = action.payload;
            if (hashtags) {
                state.params = {
                    sort,
                    category,
                    value: `#${hashtags}`
                }
            }
        }
    }
});

export default searchReducer.reducer;
export const {setSearchList, setSearchParams} = searchReducer.actions;

export type SearchListInitialStateType = {
    list: SearchListType[]
    params: SearchParamsType
}

export type SearchParamsType = {
    sort: string
    category: string
    value: string
}

export type SearchListType = {
    id: string
    name: string
    subject: string
}