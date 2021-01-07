import {combineReducers, configureStore} from '@reduxjs/toolkit';
import toolkitSlice from './slice';

const rootReducers = combineReducers(  {
    toolkit:toolkitSlice,
});
export const store = configureStore({
    reducer:rootReducers,
})
