import { Outlet } from "react-router-dom";
import Slider from "../Pages/Dashboard/Slieder/Slider";


const Dashboard = () => {
    return (
        <div className="bg-[#f4f7f3]">
            <Slider/>
            <Outlet/>
        </div>
    );
};

export default Dashboard;