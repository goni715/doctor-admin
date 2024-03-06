import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    doctorId:""
}

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        SetDoctorId:(state,action)=>{
            state.doctorId=action.payload
        },
    }

})


export const {SetDoctorId} = doctorSlice.actions;

const doctorSliceReducer = doctorSlice.reducer;
export default doctorSliceReducer;