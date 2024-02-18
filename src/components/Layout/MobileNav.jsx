import {getUserDetails, logout} from "../../helper/SessionHelper.js";
import {MdOutlineLogout} from "react-icons/md";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {IoMdClose} from "react-icons/io";
import {GiHamburgerMenu} from "react-icons/gi";
import {useEffect, useState} from "react";
import {Badge} from "antd";
import {FaBell} from "react-icons/fa";
import {SidebarMenu} from "../../Data/data.js";
import {useGetNotificationQuery} from "../../redux/features/user/userApi.js";
import {io} from "socket.io-client";

const MobileNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const [open, setOpen] = useState(false);
    const {data,refetch } = useGetNotificationQuery();
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

    //handle open
    const handleOpen = () => {
        setOpen(!open);
    }


    // const handleMenuClick = () => {
    //     setOpen(false);
    // }

    const handleNavigate = (to) => {
        navigate(to);
    }

    const user = getUserDetails();



    return (
        <>

            <div className="mobile-nav block md:hidden w-full fixed top-0 z-20 overflow-hidden">
                <div className="h-[50px] w-full bg-[#1e1e1e] p-2 flex justify-between items-center">
                    <div className="mobile-nav-header flex items-center ">
                        {open ? (
                            <IoMdClose className="mobile-nav-icon text-white cursor-pointer" size={30} onClick={handleOpen}/>
                        ): (
                            <GiHamburgerMenu className="mobile-nav-icon text-white cursor-pointer" size={30} onClick={handleOpen}/>
                        )
                        }
                        <span className="mobile-nav-title text-[#f29f67] font-bold capitalize text-xl ml-5">DOC APP</span>
                    </div>
                    <div className="content-header flex items-center pr-2 gap-5">
                        <Badge onClick={()=>navigate("/notification")} count={notification?.length || 0}>
                            <FaBell className="cursor-pointer text-white" size={20} />
                        </Badge>
                        <Link to="/profile" className="uppercase text-white">
                            {user?.name}
                        </Link>
                    </div>
                </div>

                {/*mobile menu */}

                {
                    open && (
                        <>
                            <div className="mobile-nav md:hidden bg-[#330101] min-h-screen w-[300px] shadow-lg text-white">

                                <div className="side-menu px-3 flex flex-col gap-8 py-10">
                                    {SidebarMenu.map((item,i)=>{
                                        return(
                                            <>
                                                <div key={i.toString()} onClick={()=>handleNavigate(item.path)} className={`flex items-center gap-3 cursor-pointer duration-300 hover:pl-2 hover:text-blue-700 ${pathName===item.path && "active"}`} >
                                                    <item.icon size={20} />
                                                    <span className="text-lg font-bold">
                                       {item.name}
                                    </span>
                                                </div>
                                            </>
                                        )
                                    })
                                    }

                                    <div onClick={()=>logout()} className={`flex items-center gap-3 cursor-pointer duration-300 hover:pl-2 hover:text-blue-700`}>
                                        <MdOutlineLogout size={20} />
                                        <span className="text-lg font-bold">Logout</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>


        </>
    );
};

export default MobileNav;