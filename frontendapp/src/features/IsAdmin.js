import { createSlice } from '@reduxjs/toolkit'


const initialStateValue = {
    _IS_ADMIN_STATE_:  false,
}


export const counterSlice = createSlice({
    name: 'ISADMINCOUNTER',
    initialState: initialStateValue,
    reducers: {
        _set_admin_: (state,action) => {
           state._IS_ADMIN_STATE_ = action.payload
          },
          unset_admin_: (state,action) => {
           state._IS_ADMIN_STATE_ = action.payload
          },

    },
   })

   export const {_set_admin_,unset_admin_} = counterSlice.actions

   export default counterSlice.reducer

