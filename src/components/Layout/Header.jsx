import {Badge} from "antd";
import {FaBell} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {getUserDetails} from "../../helper/SessionHelper.js";
import {useGetNotificationQuery} from "../../redux/features/user/userApi.js";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";

const Header = () => {
    const navigate = useNavigate();
    const user = getUserDetails();
    const {data,isLoading, refetch } = useGetNotificationQuery();
    const {notification} = data?.data || {};
    const [message, setMessage] = useState(""); //message from socket server

    const socket = io('http://localhost:5000');

    useEffect(()=> {
        socket.on('receive-notification', (data) => {
            setMessage(data) //socketId
        });
    },[socket]);


    useEffect(()=>{
        if(message){
            refetch();
        }
    },[message, refetch])







    return (
        <>
            <div className="p-5 hidden md:flex mb-5 shadow-md border h-[10vh] content-header  items-center justify-end pr-5 gap-5">
                <Badge key={Date.now()} onClick={()=>navigate("/notification")} count={notification?.length || 0}>
                    <FaBell className="cursor-pointer" size={20} />
                </Badge>
                <Link to="/profile" className="uppercase">
                    {user?.name}
                </Link>
            </div>
        </>
    );
};

export default Header;