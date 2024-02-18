import {Tabs} from "antd";
import {
    useDeleteAllReadMutation,
    useGetNotificationQuery,
    useMarkAllReadMutation
} from "../redux/features/user/userApi.js";
import {useNavigate} from "react-router-dom";
import ListLoading from "./Loader/ListLoading.jsx";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {useSelector} from "react-redux";

const Notification = () => {
    const navigate = useNavigate();
    const {data, isLoading, refetch } = useGetNotificationQuery();
    const user = useSelector((state)=>state.user.user) || {};
    const notification = user?.notification || [];
    const seenNotification = user?.seenNotification || [];
    const [markAllRead, {isSuccess}] = useMarkAllReadMutation();
    const [deleteAllRead, {isError}] = useDeleteAllReadMutation();
    const [message, setMessage] = useState(""); //message from socket server
    const socket = io('ws://localhost:5000', {
            reconnectionDelay: 1000,
            reconnection: true,
            reconnectionAttemps: 10,
            transports: ["websocket"],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false,
    });

    useEffect(()=> {
        socket.on('receive-notification', (data) => {
            setMessage(data)
        });
    },[socket]);


    useEffect(()=>{
        if(message){
            refetch();
        }
    },[message, refetch])




    // handle read notification
    const handleMarkAllRead = () => {
        if(notification.length > 0) {
            markAllRead();
        }
    }



    // delete notifications
    const handleDeleteAllRead = () => {
        if(seenNotification.length > 0) {
            deleteAllRead();
        }
    }




    const items = [
        {
            key: '1',
            label: 'Unread',
            children: (
                <>
                    <div className="flex justify-end">
                        <h4 onClick={handleMarkAllRead} className="p-2 text-2xl cursor-pointer">Mark All Read</h4>
                    </div>
                    <div className="flex flex-col gap-6">
                        {
                            notification.map((item,i)=>{
                                return(
                                    <>
                                        <div key={i.toString()} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                                            <div onClick={() => navigate(item?.data?.onClickPath)} className="text-lg font-semibold">
                                                {item?.message}
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>

                </>
            )
        },
        {
            key: '2',
            label: 'Read',
            children: (
                <>
                    <div className="flex justify-end">
                        <h4 onClick={handleDeleteAllRead} className="p-2 text-2xl text-blue-500 cursor-pointer">
                            Delete All Read
                        </h4>
                    </div>
                    <div className="flex flex-col gap-6">
                    {
                        seenNotification.map((item,i)=>{
                            return(
                                <>
                                    <div key={i.toString()} className="cursor-pointer bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                                        <div onClick={() => navigate(item?.data?.onClickPath)} className="text-lg font-semibold">
                                            {item?.message}
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    </div>

                </>
            )
            // children: 'Content of Tab Pane 3',
        }
    ];



    return (
        <>
           <h4 className="pt-2 text-center text-3xl mb-3">Notification Page</h4>
            {isLoading ?
                (
                    <>
                       <ListLoading/>
                    </>

                )
                : (
                    <Tabs defaultActiveKey="1" items={items}/>
                )
            }
        </>
    );
};

export default Notification;