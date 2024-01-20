import {Badge} from "antd";
import {FaBell} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {getUserDetails} from "../../helper/SessionHelper.js";
import {useGetNotificationQuery} from "../../redux/features/user/userApi.js";

const Header = () => {
    const navigate = useNavigate();
    const user = getUserDetails();
    const {data,isLoading } = useGetNotificationQuery();
    const {notification} = data?.data || {};
    return (
        <>
            <div className="p-5 hidden md:flex mb-5 bg-green-100 border h-[10vh] content-header  items-center justify-end pr-5 gap-5">
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