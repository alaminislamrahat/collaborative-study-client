import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";


const AllMeterials = () => {

    const { user } = UseAuth();

    const axiosSecure = UseAxiosSecure();

    const { data: allMaterial,refetch } = useQuery({
        queryKey: ['allMaterial'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allMaterial?email=${user.email}`);
            return data
        }
    })

    const handleDelete = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/delete/material/${id}`)
            console.log(data);
            toast.success('Data deleted successfully');
            refetch()
        }
        catch (err) {
            console.log(err);
            toast.error(err)
        }

    }
    console.log(allMaterial)
    return (
        <div>
            <h1 className="text-center font-bold text-4xl text-slate-700 py-10">All Material</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Google Link</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allMaterial?.map((item, idx) => <tr key={item._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt={item.title} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {
                                        item.title
                                    }
                                </td>
                                <td>
                                    {item.studySessionId}
                                </td>
                                <th>

                                    <div className="flex gap-3">
                                        <Link to={`/dashboard/update-material/${item._id}`}
                                            disabled={item.status === 'Accepted'}
                                            className="btn bg-yellow-100/60 text-yellow-600"><MdModeEditOutline /></Link>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            disabled={item.status === 'Accepted' || item.status === 'pending'}
                                            className="btn bg-red-100/60 text-red-600"><FaTrashAlt /></button>
                                    </div>
                                </th>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default AllMeterials;