import {logout} from "../../helper/SessionHelper.js";
import {MdOutlineLogout} from "react-icons/md";
import {useLocation, useNavigate} from "react-router-dom";
import {SidebarMenu} from "../../Data/data.js";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;

    const handleNavigate = (to) => {
        navigate(to);
    }



    return (
        <>
            {/*Side Bar part*/}
            <div className="sidebar hidden md:block bg-[#330101] min-h-screen w-[300px] shadow-lg rounded-md text-white">
                <div className="logo p-4">
                    <h6 className="text-center text-xl font-bold">DOC APP</h6>
                </div>

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
            {/*Side Bar part Ended*/}
        </>
    );
};

export default Sidebar;