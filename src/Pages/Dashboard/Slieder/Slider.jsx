import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { VscGoToEditingSession } from "react-icons/vsc";
import { MdAddCircleOutline } from "react-icons/md";
import { FaRegEdit, FaRegListAlt, FaUsers } from "react-icons/fa";
import UseAuth from "../../../Hooks/UseAuth";
import UseAdmin from "../../../Hooks/UseAdmin";
import UseTeacher from "../../../Hooks/UseTeacher";
import { CiViewList, CiViewTimeline } from "react-icons/ci";
import useStudent from "../../../Hooks/useStudent";
import { IoCreateOutline } from "react-icons/io5";

const Slider = () => {
    const { user, logOut } = UseAuth();
    const { isAdmin } = UseAdmin();
    const { isTeacher } = UseTeacher();
    const { isStudent } = useStudent();

    const navigate = useNavigate();

    const handleLogout = () =>{
        logOut()
        .then(()=>{
            navigate('/login')
        })
    }
    return (
        <div>
            {
                isTeacher && <Card className="lg:h-[calc(100vh-2rem)] w-full  p-4 shadow-xl shadow-blue-gray-900/5">
                    <div className="mb-2 p-4 x">
                        <NavLink to="/">
                            <Typography variant="h5" className="text-[#72a55f]">
                                Study Zone
                            </Typography>
                        </NavLink>
                    </div>
                    <List>
                        <NavLink to="/dashboard/dashboard-home">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <VscGoToEditingSession />
                                </ListItemPrefix>
                                Teacher Home
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/user-profile">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <VscGoToEditingSession />
                                </ListItemPrefix>
                                Profile
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/all-session">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <VscGoToEditingSession />
                                </ListItemPrefix>
                                View all study sessions
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/add-session">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <MdAddCircleOutline />
                                </ListItemPrefix>
                                Create Study Seccion
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/upload-materials">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <FaRegEdit />
                                </ListItemPrefix>
                                Upload Materiald
                                <ListItemSuffix>

                                </ListItemSuffix>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/all-materials">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <FaRegListAlt />
                                </ListItemPrefix>
                                View all materials
                            </ListItem>
                        </NavLink>

                       
                        <ListItem
                        className="text-red-500 bg-red-100/60"
                         onClick={handleLogout}>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                </Card>
            }

            {
                isAdmin && <Card className="h-[calc(100vh-2rem)] w-full  p-4 shadow-xl shadow-blue-gray-900/5">
                    <div className="mb-2 p-4">
                        <NavLink to="/">
                            <Typography variant="h5" className="text-[#72a55f]">
                                Study Zone
                            </Typography>
                        </NavLink>
                    </div>
                    <List>
                    <NavLink to="/dashboard/dashboard-home">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <VscGoToEditingSession />
                                </ListItemPrefix>
                                Admin Home
                            </ListItem>
                        </NavLink>
                    <NavLink to="/dashboard/user-profile">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <VscGoToEditingSession />
                                </ListItemPrefix>
                                Profile
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/view-all-users">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                <FaUsers />
                                </ListItemPrefix>
                                View all Users
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/view-all-session">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                <CiViewTimeline />
                                </ListItemPrefix>
                                View all study session
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/view-all-materials">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <FaRegEdit />
                                </ListItemPrefix>
                                View all materials
                             
                            </ListItem>
                        </NavLink>
                       

                        <ListItem className="text-red-500 bg-red-100/60" onClick={handleLogout}>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                </Card>
            }
            {
                isStudent && <Card className="h-[calc(100vh-2rem)] w-full  p-4 shadow-xl shadow-blue-gray-900/5">
                    <div className="mb-2 p-4">
                        <NavLink to="/">
                            <Typography variant="h5" className="text-[#72a55f]">
                                Study Zone
                            </Typography>
                        </NavLink>
                    </div>
                    <List>
                    <NavLink to="/dashboard/dashboard-home">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <VscGoToEditingSession />
                                </ListItemPrefix>
                                Student Home
                            </ListItem>
                        </NavLink>
                    <NavLink to="/dashboard/user-profile">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <VscGoToEditingSession />
                                </ListItemPrefix>
                                Profile
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/view-booked-session">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                <CiViewList />
                                </ListItemPrefix>
                                View booked session

                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/create-note">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                <IoCreateOutline />
                                </ListItemPrefix>
                                Create note
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/view-all-notes">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <FaRegEdit />
                                </ListItemPrefix>
                                View all notes
                             
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/view-all-student-materials">
                            <ListItem className="text-[#3764EB] bg-[#E9F3FF] mb-2">
                                <ListItemPrefix>
                                    <FaRegEdit />
                                </ListItemPrefix>
                                View all materials
                             
                            </ListItem>
                        </NavLink>
                       

                        <ListItem className="text-red-500 bg-red-100/60" onClick={handleLogout}>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                </Card>
            }
        </div>
    );
};

export default Slider;