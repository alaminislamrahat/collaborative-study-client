
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
            path:'login',
            element : <Login/>
        },
      ]
    },
    {
      path : 'dashboard',
      element : <Dashboard/>,
      children : [
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
          loader : ({params})=> fetch(`http://localhost:5000/session/${params.id}`)
        },
        {
          path : 'update-material/:id',
          element : <UpdateMaterial/>,
          loader : ({params})=> fetch(`http://localhost:5000/material/${params.id}`)
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
          loader : ({params})=> fetch(`http://localhost:5000/session/admin/${params.id}`)
        },
      ]
    }
  ]);