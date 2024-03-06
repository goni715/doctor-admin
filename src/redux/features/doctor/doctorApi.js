import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";
import {io} from "socket.io-client";

export const doctorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => `/doctor/get-all-doctor`,
            keepUnusedDataFor: 600,
            providesTags: ["Doctors"],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    ErrorToast("Something Went Wrong!");
                    //do nothing
                    console.log(err);
                }
            },
        }),
        getDoctorsRequest: builder.query({
            query: () => `/doctor/get-doctors-request`,
            keepUnusedDataFor: 600,
            providesTags: ["Requests"],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    ErrorToast("Something Went Wrong!");
                    //do nothing
                    console.log(err);
                }
            },
        }),
        approveDoctor: builder.mutation({
            query: (data) => ({
                url: "/doctor/approve-doctor",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Users", "Doctors", "Requests"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast("Approved Success");
                        const socket = io('http://localhost:5000');
                        socket.emit('send-notification', "send-notification")
                    }
                }catch(err) {
                    const status = err?.error?.status;
                    if(status === 409){
                        ErrorToast("Failed,This user is already a doctor");
                    }else{
                        //ErrorToast("Something Went Wrong!")
                    }
                }
            }
        }),
        removeDocRequest: builder.mutation({
            query: (id) => ({
                url: `/doctor/remove-doc-request/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Requests"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast(" Success");
                    }
                }catch(err) {
                    console.log(err);
                    let status = err?.error?.status;
                    if(status === 403){
                        ErrorToast("Failld ! This category is associated with Product");
                    }

                }
            }
        }),
    }),
})


export const {useApproveDoctorMutation,useRemoveDocRequestMutation, useGetDoctorsQuery, useGetDoctorsRequestQuery} = doctorApi;