import React from "react";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";

const Navbar = () => {

   

    const { user, logOut } = UseAuth();
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className=""> {<img className="w-[50px] rounded-full" src={user.photoURL} alt="" />} </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <NavLink className={"btn mb-4"} to={"/Dashboard"}><a>Dashboard</a></NavLink>
                            <a
                                onClick={() => logOut()}
                                className="btn">Logout</a>
                        </ul>
                    </div> : <Link to={"/register"}>Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;
