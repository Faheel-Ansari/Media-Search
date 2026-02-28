import { createSlice } from "@reduxjs/toolkit";

const likedPostFromLocalStorage = JSON.parse(localStorage.getItem('liked'))

const initialState = {
    likedPost:likedPostFromLocalStorage || [],
}

const LikeSlice = createSlice({
    name: 'like',
    initialState,
    reducers:{
        setLikedPost(state,actions){
            state.likedPost = actions.payload
            localStorage.setItem('liked', JSON.stringify(state.likedPost))
        }
    }
})

export const {setLikedPost} = LikeSlice.actions
export default LikeSlice.reducer