import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setAppStatus} from './appReducer';
import {categoryApi} from '../../api/categoryApi';

const categoriesInitialState: CategoriesInitialStateType = {
    categories: [],
};

export const createCategoryThunk = createAsyncThunk('create-category-thunk', async (arg: { category: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'));
    try {
        const category = arg.category.toLowerCase();
        const res = await categoryApi.createCategory(category);
        thunkAPI.dispatch(setCategories(res.data.categories.map(c => c.toUpperCase())));
    } catch (e) {
        throw e;
    }finally {
        thunkAPI.dispatch(setAppStatus('stop'));
    }
});

export const getCategoriesThunk = createAsyncThunk('get-categories-thunk', async (arg, thunkAPI) => {
    try {
        const res = await categoryApi.getCategories();
        const {dispatch} = thunkAPI;
        dispatch(setCategories(res.data.categories.map(c => c.toUpperCase())))
    } catch (e) {
        throw e;
    }
});


const categoriesSlice = createSlice({
    name: 'categories-slice',
    initialState: categoriesInitialState,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        }
    },
});


const {setCategories} = categoriesSlice.actions;
export default categoriesSlice.reducer;

type CategoriesInitialStateType = {
    categories: string[]
}