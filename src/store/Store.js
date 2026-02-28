import { configureStore } from "@reduxjs/toolkit";
import searchReducer from '../features/SearchSlice.js';
import likeReducer from '../features/LikeSlice.js'
import saveReducer from '../features/SavedSlice.js'

export const store = configureStore({
    reducer:{
        search:searchReducer,
        like:likeReducer,
        save:saveReducer
    }
})