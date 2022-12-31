import {createSlice} from '@reduxjs/toolkit';

const AppReducerInitialState: AppReducerInitialStateType = {
    status: 'stop'
}

const appSlice = createSlice({
    name: 'app',
    initialState: AppReducerInitialState,
    reducers: {
        setAppStatus(state, action) {
            if (action.payload === 'loading' || action.payload === 'stop') {
                state.status = action.payload;
            }
        }
    }
});


export const {setAppStatus} = appSlice.actions;
export default appSlice.reducer;
export type AppReducerInitialStateType = {
    status: AppStatusType
};

export type AppStatusType = 'loading' | 'stop';