import { createSlice } from '@reduxjs/toolkit'


const initialStateValue = {
    JwtAccessToken:  null,
    JwtRefreshToken:null,
}

export const counterSlice = createSlice({
 name: 'CountJwtRefreshAccessToken',
 initialState: initialStateValue,
 reducers: {
    _save_access_token_: (state,action) => {
        state.JwtAccessToken = action.payload
       },
       _save_refresh_token_: (state,action) => {
        state.JwtRefreshToken = action.payload
       },

    __delete_refresh_token_: (state, action) => {
        state.JwtRefreshToken = null
        state.JwtAccessToken = null
        },
 },
})

export const {_save_access_token_,_save_refresh_token_, __delete_refresh_token_} = counterSlice.actions

export default counterSlice.reducer

