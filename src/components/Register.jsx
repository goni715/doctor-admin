import {useEffect, useState} from "react";
import {useRegisterMutation} from "../redux/features/auth/authApi.js";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [register, {isLoading, isSuccess}] = useRegisterMutation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isSuccess){
            navigate('/login');
        }
    },[navigate,isSuccess]);


    const handleSubmit = (e) => {
        e.preventDefault();
        register({
            name, email, password
        })
    }





    return (
        <>

            <div className="min-h-screen bg-white flex justify-center px-5 items-center">
                <div className="bg-white p-10 border border-gray-800 rounded">
                    <h1 className="text-center font-semibold text-2xl">Register Form </h1>
                    <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6 py-5">
                        <div>
                            <label className="inline-block pb-2 text-gray-800" htmlFor="name">Name</label>
                            <input
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                className="w-full focus:outline-none border border-gray-300 px-4 py-2 rounded-lg"
                                type="text"
                                id="name"
                                required
                            />
                        </div>
                        <div>
                            <label className="inline-block pb-2 text-gray-800" htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="w-full focus:outline-none border border-gray-300 px-4 py-2 rounded-lg"
                                type="email"
                                id="email"
                                required
                            />
                        </div>
                        <div>
                            <label className="inline-block pb-2 text-gray-800" htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className="w-full focus:outline-none border border-gray-300 px-4 py-2 rounded-lg"
                                type="password"
                                id="password"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center flex-wrap">
                        <span onClick={()=>navigate('/login')} className="text-primary underline cursor-pointer">Already user login here</span>
                        <button className="ml-3 bg-primary px-3 py-2 text-white font-bold text-md rounded-md max-[370px]:mt-3" disabled={isLoading}>
                            {isLoading ? "Processing..." : "Register"}
                        </button>
                    </div>
                    </form>
                </div>
            </div>


        </>
    );
};

export default Register;