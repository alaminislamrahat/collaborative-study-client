import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


const ViewAllUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const [role, setRole] = useState();

    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');

    const [allRole, setAllRole] = useState([])

    // const { data: allRole, refetch } = useQuery({
    //     queryKey: ['admin'],
    //     queryFn: async () => {
    //         const { data } = await axiosSecure.get(`/all-role?search=${search}`)
    //         return data
    //     }
    // })

    useEffect(()=>{
        
       getData()
    },[axiosSecure, search])

    // console.log(allRole)


    const getData = async () => {
        const {data} = await axiosSecure.get(`/all-role?search=${search}`)
        setAllRole(data)
    }

   

    const handleRoleChange = async (id) => {
        // console.log(id)
        try {
            const { data } = await axiosSecure.put(`/users/role/${id}`, { role })
            // console.log(data);
            toast.success(`Now role is ${role}`);
            getData()

        }
        catch (err) {
            console.log(err)
            toast.error(err)
        }
    }


    const handleSearch = e => {
        e.preventDefault();

        setSearch(searchText)
    }

    return (
        <div>

            {/* search  */}
            <div className="flex items-center justify-center">
                <form className="py-10 mx-auto" onSubmit={handleSearch}>
                    <div className='flex p-1 overflow-hidden  rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                        <input
                            onChange={e => setSearchText(e.target.value)}
                            className='px-6 border py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                            type='text'
                            name='search'
                            placeholder='Enter Job Title'
                            aria-label='Enter Job Title'
                        />

                        <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                            Search
                        </button>
                    </div>
                </form>
            </div>


            {/* table  */}
            <div className="overflow-x-auto">

                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Select Role</th>
                            <th>Update Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allRole?.map(item => <tr key={item._id}>
                                <th>

                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item?.photo}
                                                    alt={item.name} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <select
                                        onChange={(e) => setRole(e.target.value)}

                                        name="sort"
                                        id="sort"
                                        className={`border-teal-500 border-2 bg-transparent  p-3 rounded-md w-full md:w-auto`}
                                    >

                                        <option defaultValue={item.role} >
                                            student
                                        </option>
                                        <option >
                                            teacher
                                        </option>
                                        <option >
                                            Admin
                                        </option>


                                    </select>
                                </td>
                                <th>
                                    <button
                                        onClick={() => handleRoleChange(item._id)}
                                        className="btn bg-[#72a55f] text-white btn-xs"><CiEdit /> Update ROle</button>
                                </th>
                            </tr>
                            )
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ViewAllUsers;