import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";
import {setToken, setUserDetails} from "../../../helper/SessionHelper.js";
import {HideLoading, ShowLoading} from "./authSlice.js";


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/user/register",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    dispatch(ShowLoading());
                    const res = await queryFulfilled;
                    dispatch(HideLoading());
                    if(res?.data?.message === "success"){
                        SuccessToast("Register Success");
                    }

                }catch(err) {
                    dispatch(HideLoading());
                    const status = err?.error?.status;
                    if(status === 409){
                        ErrorToast("Email Already Exist");
                    }else{
                        ErrorToast("Something Went Wrong!")
                    }
                }
            }
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    dispatch(ShowLoading());
                    const res = await queryFulfilled;
                    dispatch(HideLoading());
                    if(res?.data?.message === "success"){
                        let MyToken = res.data['token'];
                        setToken(MyToken);
                        let user = res.data['result']; //This is Object
                        let userDetails = {
                            name: user['name'],
                        }
                        setUserDetails(userDetails);
                        SuccessToast("Login Success");
                    }


                    setTimeout(()=>{
                        //window.location.href="/inbox";
                    },200)


                }catch(err) {
                    dispatch(HideLoading());
                    const status = err?.error?.status;
                    if(status === 404){
                        ErrorToast("Could not Find this Email!");
                    }else if(status === 400){
                        ErrorToast("Wrong Password!")
                    }else{
                        ErrorToast("Something Went Wrong!")
                    }
                }
            }
        })

    }),
})


export const {useRegisterMutation, useLoginMutation} = authApi;