import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ErrorToast} from "../../../helper/ValidationHelper.js";
import {getToken} from "../../../helper/SessionHelper.js";

const baseQuery = fetchBaseQuery({
<<<<<<< HEAD
    baseUrl: "https://doctor-api-goni.vercel.app/api",
    //baseUrl: "http://localhost:5000/api",
=======
     baseUrl: "https://doctor-api-goni.vercel.app/api",
   // baseUrl: "http://localhost:5000/api",
>>>>>>> 341efcb6804b35662af4a2af24e4d06b5cd54f7e
    prepareHeaders: async (headers, {getState, endpoint}) =>{
        if(getToken()){
            headers.set("token", getToken());
        }
        return headers;
    }
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        if (result?.error?.status === 401) {
            localStorage.clear();
            ErrorToast("Token Expired");
            window.location.href="/";
        }
        return result;
    },
    tagTypes: ["Notification", "Profile","Users", "Doctors", "Requests"], //TagS WhiteLists
    endpoints: (builder) => ({}),
})



