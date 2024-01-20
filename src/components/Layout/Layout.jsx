import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import MobileNav from "./MobileNav.jsx";

const Layout = ({children}) => {


    return (
        <>
            <MobileNav/>
            <div className="p-0 h-screen pt-[80px] md:pt-0">
                <div className="layout flex gap-6">
                    <Sidebar/>

                    {/*Content*/}
                    <div className="content w-full h-full">
                        <Header/>

                        {/*Content Body*/}
                        <div className="content-body p-5 h-[85vh]">
                            {children}
                        </div>
                        {/*Content Body Ended*/}


                    </div>
                    {/*Content Ended*/}
                </div>
            </div>
        </>
    );
};

export default Layout;