import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";


const Root = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-285px)] bg-[#f5f8f4]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;