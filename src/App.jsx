import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import DoctorListPage from "./pages/DoctorListPage.jsx";
import UserListPage from "./pages/UserListPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import DoctorsRequestPage from "./pages/DoctorsRequestPage.jsx";




const App = () => {


    return (
        <>
             <BrowserRouter>
                 <Routes>
                     <Route path="/" element={<PrivateRoute> <HomePage/> </PrivateRoute>} />
                     {/*<Route path="/appointment" element={<PrivateRoute> <AppointmentPage/> </PrivateRoute>} />*/}
                     {/*<Route path="/apply-doctor" element={<PrivateRoute> <ApplyDoctorPage/> </PrivateRoute>} />*/}
                     <Route path="/profile" element={<PrivateRoute> <ProfilePage/> </PrivateRoute>} />
                     <Route path="/admin/doctors" element={<PrivateRoute> <DoctorListPage/> </PrivateRoute>} />
                     <Route path="/admin/doctors-request" element={<PrivateRoute> <DoctorsRequestPage/> </PrivateRoute>} />
                     <Route path="/admin/users" element={<PrivateRoute> <UserListPage/> </PrivateRoute>} />
                     <Route path="/admin/users" element={<PrivateRoute> <UserListPage/> </PrivateRoute>} />
                     <Route path="/notification" element={<PrivateRoute> <NotificationPage/> </PrivateRoute>} />


                     <Route path="/register" element={<PublicRoute> <Register/> </PublicRoute>}/>
                     <Route path="/login" element={<PublicRoute> <Login/> </PublicRoute>}/>
                 </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;