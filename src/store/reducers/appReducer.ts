import {createSlice} from '@reduxjs/toolkit';

const AppReducerInitialState: AppReducerInitialStateType = {
    status: 'stop',
    isDarkTheme: false,
    language: 'en'
}

const appSlice = createSlice({
    name: 'app',
    initialState: AppReducerInitialState,
    reducers: {
        setAppStatus(state, action) {
            if (action.payload === 'loading' || action.payload === 'stop') {
                state.status = action.payload;
            }
        },
        setAppTheme(state, action) {
            state.isDarkTheme = action.payload;
        },
        setLanguage(state, action) {
            state.language = action.payload;
        }
    }
});


export const {setAppStatus, setAppTheme, setLanguage} = appSlice.actions;
export default appSlice.reducer;
export type AppReducerInitialStateType = {
    status: AppStatusType
    isDarkTheme: boolean
    language: LangType
};

export type AppStatusType = 'loading' | 'stop';
export type LangType = 'ru' | 'en';