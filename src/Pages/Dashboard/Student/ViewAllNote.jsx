import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MdModeEditOutline } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import UseAuth from '../../../Hooks/UseAuth';

const ViewAllNote = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = UseAuth();

    const { data: note, refetch} = useQuery({
        queryKey: ['note'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/note-student?email=${user.email}`);
            return data
        }
    })


    const handleDelete = async(id) => {
        console.log(id);
        try{
            const {data} = await axiosSecure.delete(`/note-delete-student/${id}`)
            console.log(data);
            toast.success('Deleted successfully')
            refetch();
        }
        catch(err){
            console.log(err);
            toast.error(err)
        }
    }
    return (
        <div>
            <h1 className="text-center font-bold text-4xl text-slate-700 py-10">
                All Sessions
            </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Title</th>
                        
                            <th>Description</th>
                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {note?.map((item, idx) => (
                            <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                               
                                
                                <td>
                                    <div className="flex gap-3">
                                        <Link to={`/dashboard/update-note/${item._id}`}
                                            disabled={item.status === 'Accepted'}
                                            className="btn bg-yellow-100/60 text-yellow-600"><MdModeEditOutline /></Link>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            disabled={item.status === 'Accepted' || item.status === 'pending'}
                                            className="btn bg-red-100/60 text-red-600"><FaTrashAlt /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default ViewAllNote;