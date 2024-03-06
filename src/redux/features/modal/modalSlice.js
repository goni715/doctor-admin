import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    categoryEditModalOpen: false,
    categoryDeleteModalOpen: false,
    docReqRemoveModalOpen:false
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        SetCategoryEditModalOpen:(state,action)=>{
            state.categoryEditModalOpen=action.payload
        },
        SetCategoryDeleteModalOpen:(state,action)=>{
            state.categoryDeleteModalOpen=action.payload
        },
        SetDocReqRemoveModalOpen:(state,action)=>{
            state.docReqRemoveModalOpen=action.payload
        },

    }

})


export const {SetDocReqRemoveModalOpen, SetCategoryDeleteModalOpen} = modalSlice.actions;

const modalSliceReducer = modalSlice.reducer;
export default modalSliceReducer;