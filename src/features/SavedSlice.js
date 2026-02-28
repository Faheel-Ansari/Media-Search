import { createSlice } from "@reduxjs/toolkit";

const savedPostFromLocalStorage = JSON.parse(localStorage.getItem('saved'))

const initialState = {
    savedPost: savedPostFromLocalStorage || [],
}

const SaveSlice = createSlice({
    name: 'save',
    initialState,
    reducers: {
        setSavedPost(state, actions) {
            state.savedPost = actions.payload
            localStorage.setItem('saved', JSON.stringify(state.savedPost))
        }
    }
})

export const { setSavedPost } = SaveSlice.actions
export default SaveSlice.reducer