import {Tabs} from "antd";
import {
    useDeleteAllReadMutation,
    useGetMyProfileQuery,
    useMarkAllReadMutation
} from "../redux/features/user/userApi.js";
import {useNavigate} from "react-router-dom";
import ListLoading from "./Loader/ListLoading.jsx";

const Notification = () => {
    const navigate = useNavigate();
    const {data, isLoading } = useGetMyProfileQuery();
    const user = data?.data;
    const [markAllRead, {isSuccess}] = useMarkAllReadMutation();
    const [deleteAllRead, {isError}] = useDeleteAllReadMutation();
    // const isLoading = true;


    // handle read notification
    const handleMarkAllRead = () => {
        if(user?.notification.length > 0) {
            markAllRead();
        }
    }



    // delete notifications
    const handleDeleteAllRead = () => {
        if(user?.seenNotification.length > 0) {
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
                            user?.notification.map((item,i)=>{
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
                        user?.seenNotification.map((item,i)=>{
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