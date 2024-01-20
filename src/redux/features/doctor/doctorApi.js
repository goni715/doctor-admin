import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";

export const doctorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        applyDoctor: builder.mutation({
            query: (data) => ({
                url: "/user/apply-doctor",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast("Apply Success");
                    }
                }catch(err) {
                    console.log(err)
                    ErrorToast("Something Went Wrong!")
                }
            }
        }),
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
                    }
                }catch(err) {
                    console.log(err)
                    ErrorToast("Something Went Wrong!")
                }
            }
        }),
    }),
})


export const {useApplyDoctorMutation,useApproveDoctorMutation, useGetDoctorsQuery, useGetDoctorsRequestQuery} = doctorApi;