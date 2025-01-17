import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import toast from "react-hot-toast";


const ViewAllUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const [role, setRole] = useState()

    const { data: allRole, refetch } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-role')
            return data
        }
    })

    const handleRoleChange = async (id) => {
      console.log(id)
        try {
            const { data } = await axiosSecure.put(`/users/role/${id}`,{role})
            console.log(data);
            toast.success(`Now role is ${role}`);
            refetch()
           
        }
        catch (err) {
            console.log(err)
            toast.error(err)
        }
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <h1 className="text-center font-bold text-4xl my-5">Users</h1>
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