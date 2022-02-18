import { createSlice } from '@reduxjs/toolkit'


const initialStateValue = {
    ProfileData:  [],
}

export const counterSlice = createSlice({
 name: '_PROFILE_DATA_',
 initialState: initialStateValue,
 reducers: {
    _save_data_: (state,action) => {
        state.ProfileData = action.payload
       },
    _update_show_data_: (state,action) => {
    state.ProfileData = action.payload
    },
 },
})


export const {_save_data_,_update_show_data_} = counterSlice.actions

export default counterSlice.reducer
