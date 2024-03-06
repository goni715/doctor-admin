import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";
import {setNotification} from "../../../helper/SessionHelper.js";
import {SetUser} from "./userSlice.js";


export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/user/get-all-user`,
            keepUnusedDataFor: 600,
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const res = await queryFulfilled;
                } catch (err) {
                    ErrorToast("Something Went Wrong!");
                    //do nothing
                    console.log(err);
                }
            },
        }),
        getNotification: builder.query({
            query: () => `/user/get-my-profile`,
            keepUnusedDataFor: 600,
            providesTags: ["Notification"],
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const res = await queryFulfilled;
                    dispatch(SetUser(res?.data?.data))
                } catch (err) {
                    ErrorToast("Something Went Wrong!");
                    //do nothing
                    console.log(err);
                }
            },
        }),
        markAllRead: builder.mutation({
            query: () => ({
                url: "/user/mark-all-read-notification",
                method: "PUT",
            }),
            invalidatesTags: ["Notification", "Profile"],
            async onQueryStarted(arg, {queryFulfilled}) {
                try {
                    const res = await queryFulfilled;
                    setNotification(0);
                    if (res?.data?.message === "success") {
                        SuccessToast("Mark all Read Success");
                    }
                } catch (err) {
                    ErrorToast("Something went wrong!")
                }
            }
        }),
        deleteAllRead: builder.mutation({
            query: () => ({
                url: "/user/delete-all-read-notification",
                method: "PUT",
            }),
            invalidatesTags: ["Notification", "Profile"],
            async onQueryStarted(arg, {queryFulfilled}) {
                try {
                    const res = await queryFulfilled;
                    if (res?.data?.message === "success") {
                        SuccessToast("Notifications Deleted successfully");
                    }
                } catch (err) {
                    ErrorToast("Something went wrong!")
                }
            }
        })
    })
})



export const {useGetUsersQuery, useGetNotificationQuery, useMarkAllReadMutation, useDeleteAllReadMutation} = userApi;