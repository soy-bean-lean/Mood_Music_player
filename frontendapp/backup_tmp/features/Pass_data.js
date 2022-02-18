import { createSlice } from '@reduxjs/toolkit'


const initialStateValue = {
    Pass_id_for_song:  [],
}

export const counterSlice = createSlice({
 name: '_PASS_LIST_ID_SONGS_',
 initialState: initialStateValue,
 reducers: {
    _save_and_play_song_from_list_: (state,action) => {
        state.Pass_id_for_song = action.payload
       }
 },
})


export const {_save_and_play_song_from_list_} = counterSlice.actions

export default counterSlice.reducer

