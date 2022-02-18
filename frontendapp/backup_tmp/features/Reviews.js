import { createSlice } from '@reduxjs/toolkit'


const initialStateValue = {
    _songs_reviews:  [],
}

export const counterSlice = createSlice({
 name: '_REVIEWS_',
 initialState: initialStateValue,
 reducers: {
    _show_reviews_: (state,action) => {
        state._songs_reviews = action.payload
       },
    // _update_show_reviews_: (state,action) => {
    // state._songs_reviews = action.payload
    // },
 },
})


export const {_show_reviews_} = counterSlice.actions

export default counterSlice.reducer

