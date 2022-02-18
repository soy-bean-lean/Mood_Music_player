import { createSlice } from '@reduxjs/toolkit'


const initialStateValue = {
    _song_list_:  [],
}

export const counterSlice = createSlice({
 name: '_SONGS_',
 initialState: initialStateValue,
 reducers: {
    _save_songs_: (state,action) => {
        state._song_list_ = action.payload
       }
 },
})


export const {_save_songs_} = counterSlice.actions

export default counterSlice.reducer

