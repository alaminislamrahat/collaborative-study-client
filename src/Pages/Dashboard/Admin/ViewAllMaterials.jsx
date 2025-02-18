import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CgRemove } from 'react-icons/cg';

const ViewAllMaterials = () => {

    const axiosSecure = UseAxiosSecure();

    const { data: allMaterial,refetch } = useQuery({
        queryKey: ['material-admin'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allMaterial/admin`);
            return data
        }
    })

    const handleDelete = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/delete/material/${id}`)
            // console.log(data);
            toast.success('Data deleted successfully');
            refetch()
        }
        catch (err) {
            // console.log(err);
            toast.error(err)
        }

    }
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
                                    
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                       
                                        className="btn bg-red-100/60 text-red-600"><CgRemove /></button>
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

export default ViewAllMaterials;