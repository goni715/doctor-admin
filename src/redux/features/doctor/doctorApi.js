import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";
import {io} from "socket.io-client";

export const doctorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => `/admin/get-all-doctor`,
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
            query: () => `/admin/get-doctors-request`,
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
                url: "/admin/approve-doctor",
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
                    console.log(err)
                    ErrorToast("Hello approve doctor")
                    ErrorToast("Something Went Wrong!")
                }
            }
        }),
    }),
})


export const {useApproveDoctorMutation, useGetDoctorsQuery, useGetDoctorsRequestQuery} = doctorApi;