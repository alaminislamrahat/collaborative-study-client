import React from "react";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import UseTeacher from "../../../Hooks/UseTeacher";
import UseAdmin from "../../../Hooks/UseAdmin";
import useStudent from "../../../Hooks/useStudent";

const Navbar = () => {
    const {isTeacher} = UseTeacher();
    const {isAdmin} = UseAdmin();
    const {isStudent} = useStudent();


    const { user, logOut } = UseAuth();
    return (
       <div className="bg-base-100">
         <div className="navbar container mx-auto z-20 ">
            <div className="navbar-start">

                <a className="btn text-white bg-[#71A45E] text-xl">Study Zone</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="dropdown dropdown-end z-50">
                        <div tabIndex={0} role="button" className=""> {<img className="w-[50px] h-[50px] bg-cover border border-[#71A45E] rounded-full" src={user.photoURL} alt={user.displayName} /> || <GiHamburgerMenu /> } </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {
                              user && isTeacher &&  <NavLink className={"btn mb-4"} to={"/dashboard/all-session"}><a>Dashboard</a></NavLink>
                            }

                            {
                                 user && isAdmin &&  <NavLink className={"btn mb-4"} to={"/dashboard/view-all-users"}><a>Dashboard</a></NavLink>  
                            }
                            {
                                 user && isStudent &&  <NavLink className={"btn mb-4"} to={"/dashboard/view-booked-session"}><a>Dashboard</a></NavLink>  
                            }
                            <NavLink className={"btn mb-4"} to={"/all-session-page"}><a>All Session</a></NavLink> 

                            <a
                                onClick={() => logOut()}
                                className="btn">Logout</a>
                        </ul>
                    </div> : <Link className="btn bg-[#E9F9EF]" to={"/login"}>Login</Link>
                }
            </div>
        </div>
       </div>
    );
};

export default Navbar;
