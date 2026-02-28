import { createSlice } from "@reduxjs/toolkit"


export const getRandomQuery = () => {
    const randomSearchNames = [
        "cat",
        "dog",
        "car",
        "horse",
        "house",
        "architecture",
        "nature",
        "landscapes",
        "beauty",
        "sports",
        "wallpapers",
    ];
    const randomQuery =
        randomSearchNames[Math.floor(Math.random() * randomSearchNames.length)];
    return randomQuery
};


const initialState = { query: '', randomQuery: getRandomQuery(), activeTab: 'photos', results: [], loading: false, error: null }

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery(state, actions) {
            state.query = actions.payload
        },
        setRandomQuery(state, actions){
            state.randomQuery = getRandomQuery()
        },
        setActiveTab(state, actions) {
            state.activeTab = actions.payload
        },

        setResult(state, actions) {
            state.results = actions.payload
            state.loading = false
            state.error = null
        },

        setLoading(state, actions) {
            state.loading = actions.payload
            state.error = null
        },

        setError(state, actions) {
            state.error = actions.payload
            state.loading = false
        },

        clearResult(state) {
            state.results = []
        }
    }
})


export const { setQuery, setActiveTab, setResult, setLoading, setError, clearResult, setRandomQuery } = searchSlice.actions
export default searchSlice.reducer
