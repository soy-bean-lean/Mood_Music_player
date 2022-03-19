import { createSlice } from '@reduxjs/toolkit'


const initialStateValue = {
    _IS_ADMIN_STATE_:  false,
    _IS_USER_STATE_:  true,
}


export const counterSlice = createSlice({
    name: 'ISADMINCOUNTER',
    initialState: initialStateValue,
    reducers: {
        _set_admin_: (state,action) => {
           state._IS_ADMIN_STATE_ = action.payload
          },
          _set_admin_to_user_: (state,action) => {
           state._IS_USER_STATE_ = action.payload
          },
          unset_admin_: (state,action) => {
            state._IS_ADMIN_STATE_ = action.payload
           },
    },
   })

   export const {_set_admin_,unset_admin_,_set_admin_to_user_} = counterSlice.actions

   export default counterSlice.reducer

