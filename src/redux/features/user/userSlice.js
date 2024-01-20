import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users:[],
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SetUsers : (state, action)=>{
            state.users=action.payload;
        },
        SetUser: (state, action) => {
            state.user = action.payload;
        },
    }
})


export const {SetUsers, SetUser} = userSlice.actions;
const userSliceReducer = userSlice.reducer;
export default userSliceReducer;