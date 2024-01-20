import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   loading:false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        ShowLoading : (state)=>{
            state.loading=true;
        },
        HideLoading : (state)=>{
            state.loading=false;
        }
    }
})



export const {ShowLoading, HideLoading} = authSlice.actions;

const authSliceReducer = authSlice.reducer;
export default authSliceReducer;