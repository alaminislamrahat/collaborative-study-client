import { Outlet } from "react-router-dom";
import Slider from "../Pages/Dashboard/Slieder/Slider";


const Dashboard = () => {
    return (
        <div className="bg-[#f4f7f3]">
            <div className="flex">
                <Slider />
              <div className="flex-1">
              <Outlet />
              </div>
            </div>
        </div>
    );
};

export default Dashboard;