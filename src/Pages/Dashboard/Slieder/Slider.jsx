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
import { NavLink } from "react-router-dom";
import { VscGoToEditingSession } from "react-icons/vsc";
import { MdAddCircleOutline } from "react-icons/md";
import { FaRegEdit, FaRegListAlt } from "react-icons/fa";

const Slider = () => {
    return (
        <div>
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
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

                    <ListItem>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>
        </div>
    );
};

export default Slider;