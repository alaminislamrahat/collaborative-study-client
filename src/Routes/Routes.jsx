
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
            path:'/register',
            element : <Register/>
        },
        {
            path:'/login',
            element : <Login/>
        },
      ]
    },
    {
      path : 'dashboard',
      element : <Dashboard/>,
      children : [
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
      ]
    }
  ]);