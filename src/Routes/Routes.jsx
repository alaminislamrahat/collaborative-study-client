
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Root from "../Layout/Root";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import Login from "../Pages/Login/Login";
import AllSession from "../Pages/Dashboard/TeacherDashboard/AllSession";
import AddStudySession from "../Pages/Dashboard/TeacherDashboard/AddStudySession";
import UploadMeterials from "../Pages/Dashboard/TeacherDashboard/UploadMeterials";
import AllMeterials from "../Pages/Dashboard/TeacherDashboard/AllMeterials";
import ViewAllUsers from "../Pages/Dashboard/Admin/ViewAllUsers";
import ViewAllStudySession from "../Pages/Dashboard/Admin/ViewAllStudySession";
import ViewAllMaterials from "../Pages/Dashboard/Admin/ViewAllMaterials";
import UpdateSessionTutor from "../Pages/Dashboard/TeacherDashboard/UpdateSessionTutor";
import UpdateSessionAdmin from "../Pages/Dashboard/Admin/UpdateSessionAdmin";
import UpdateMaterial from "../Pages/Dashboard/TeacherDashboard/UpdateMaterial";
import ViewBookedSession from "../Pages/Dashboard/Student/ViewBookedSession";
import CreateNote from "../Pages/Dashboard/Student/CreateNote";
import DetailCard from "../Pages/DetailCard/DetailCard";
import Payment from "../Pages/Dashboard/Payment/Payment";
import ViewAllNote from "../Pages/Dashboard/Student/ViewAllNote";
import UpdateNote from "../Pages/Dashboard/Student/UpdateNote";
import ViewAllStudentMaterial from "../Pages/Dashboard/Student/ViewAllStudentMaterial";
import AllSessionPage from "../Pages/AllSessionPage/AllSessionPage";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children : [
        {
            path:'/',
            element : <Home/>
        },
        {
            path:'register',
            element : <Register/>
        },
        {
            path:'all-session-page',
            element : <AllSessionPage/>
        },
        {
            path:'login',
            element : <Login/>
        },
        {
            path:'detail/:id',
            element : <DetailCard/>,
            loader : ({params})=> fetch(`https://collaborative-study-platform-server-alpha.vercel.app/detail/${params.id}`)
        },
      ]
    },
    {
      path : 'dashboard',
      element : <Dashboard/>,
      children : [

        {
          path : 'user-profile',
          element : <UserProfile/>
        },
        {
          path : 'dashboard-home',
          element : <DashboardHome/>
        },
        //student
        {
          path: 'view-booked-session',
          element : <ViewBookedSession/>
        },
        {
          path: 'create-note',
          element : <CreateNote/>
        },
        {
          path: 'view-all-notes',
          element : <ViewAllNote/>
        },
        {
          path: 'view-all-student-materials',
          element : <ViewAllStudentMaterial/>
        },
        {
          path: 'update-note/:id',
          element : <UpdateNote/>,
          loader : ({params})=>fetch(`https://collaborative-study-platform-server-alpha.vercel.app/note-student/${params.id}`)
        },

        // for tutor
        {
          path : 'all-session',
          element : <AllSession/>
        },
        {
          path : 'add-session',
          element : <AddStudySession/>
        },
        {
          path : 'upload-materials',
          element : <UploadMeterials/>
        },

        {
          path : 'all-materials',
          element : <AllMeterials/>
        },
        {
          path : 'update-session/:id',
          element : <UpdateSessionTutor/>,
          loader : ({params})=> fetch(`https://collaborative-study-platform-server-alpha.vercel.app/session/${params.id}`)
        },
        {
          path : 'update-material/:id',
          element : <UpdateMaterial/>,
          loader : ({params})=> fetch(`https://collaborative-study-platform-server-alpha.vercel.app/material/${params.id}`)
        },
       
        // for admin
        {
          path : 'view-all-users',
          element : <ViewAllUsers/>
        },
        {
          path : 'view-all-session',
          element : <ViewAllStudySession/>
        },
        {
          path : 'view-all-materials',
          element : <ViewAllMaterials/>
        },
        {
          path : 'update-session-admin/:id',
          element : <UpdateSessionAdmin/>,
          loader : ({params})=> fetch(`https://collaborative-study-platform-server-alpha.vercel.app/session/admin/${params.id}`)
        },

        // payment route 
        {
          path : 'payment/:id',
          element : <Payment/>,
          loader : ({params})=>fetch(`https://collaborative-study-platform-server-alpha.vercel.app/session/payment/${params.id}`)
        }
      ]
    }
  ]);