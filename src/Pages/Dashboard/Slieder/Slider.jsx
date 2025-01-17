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
import { CiViewTimeline } from "react-icons/ci";

const Slider = () => {
    const { user, logOut } = UseAuth();
    const { isAdmin } = UseAdmin();
    const { isTeacher } = UseTeacher();

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
                isTeacher && <Card className="h-[calc(100vh-2rem)] w-full  p-4 shadow-xl shadow-blue-gray-900/5">
                    <div className="mb-2 p-4">
                        <NavLink to="/">
                            <Typography variant="h5" color="blue-gray">
                                Study Zone
                            </Typography>
                        </NavLink>
                    </div>
                    <List>
                        <NavLink to="/dashboard/all-session">
                            <ListItem>
                                <ListItemPrefix>
                                    <VscGoToEditingSession />
                                </ListItemPrefix>
                                View all study sessions
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/add-session">
                            <ListItem>
                                <ListItemPrefix>
                                    <MdAddCircleOutline />
                                </ListItemPrefix>
                                Create Study Seccion
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/upload-materials">
                            <ListItem>
                                <ListItemPrefix>
                                    <FaRegEdit />
                                </ListItemPrefix>
                                Upload Materiald
                                <ListItemSuffix>

                                </ListItemSuffix>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/all-materials">
                            <ListItem>
                                <ListItemPrefix>
                                    <FaRegListAlt />
                                </ListItemPrefix>
                                View all materials
                            </ListItem>
                        </NavLink>

                       
                        <ListItem onClick={handleLogout}>
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
                            <Typography variant="h5" color="blue-gray">
                                Study Zone
                            </Typography>
                        </NavLink>
                    </div>
                    <List>
                        <NavLink to="/dashboard/view-all-users">
                            <ListItem>
                                <ListItemPrefix>
                                <FaUsers />
                                </ListItemPrefix>
                                View all Users
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/view-all-session">
                            <ListItem>
                                <ListItemPrefix>
                                <CiViewTimeline />
                                </ListItemPrefix>
                                View-all-study-session
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/view-all-materials">
                            <ListItem>
                                <ListItemPrefix>
                                    <FaRegEdit />
                                </ListItemPrefix>
                                View-all-materials
                             
                            </ListItem>
                        </NavLink>
                       

                        <ListItem onClick={handleLogout}>
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