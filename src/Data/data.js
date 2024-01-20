import {FaHome, FaUser} from "react-icons/fa";
import {FaUserDoctor} from "react-icons/fa6";


// admin menu
export const SidebarMenu = [
    {
        name: "Home",
        path: "/",
        icon: FaHome,
    },
    {
        name: "Doctors Request",
        path: "/admin/doctors-request",
        icon: FaUserDoctor,
    },
    {
        name: "Doctor List",
        path: "/admin/doctors",
        icon: FaUserDoctor,
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: FaUser,
    },
    {
        name: "Profile",
        path: "/profile",
        icon: FaUser,
    },
];
