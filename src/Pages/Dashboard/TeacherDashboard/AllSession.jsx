import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import UseAuth from "../../../Hooks/UseAuth";


const AllSession = () => {

    const axiosSecure = UseAxiosSecure();
    const {user } = UseAuth()

    const { data: studysession = [], refetch } = useQuery({
        queryKey: [user?.email,"allSession"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allSession/tutor?email=${user.email}`);
            return data;
        },
    });

    const handleDelete = async(id) => {
        console.log(id);
        try{
            const {data} = await axiosSecure.delete(`/session/delete/tutor/${id}`)
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
                            <th>Session Title</th>
                            <th>Tutor Name</th>
                            <th>Duration</th>
                            <th>Registration Fee</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studysession.map((item, idx) => (
                            <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.sessionTitle}</td>
                                <td>{item.tutorName}</td>
                                <td>{item.sessionDuration}</td>
                                <td>{item.registrationFee}</td>
                                <td>
                                    <div
                                        className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
                                            ${item.status === "pending" && "text-yellow-500 bg-yellow-100/60"}
                                            ${item.status === "Accepted" && "text-green-500 bg-green-100/60"}
                                            ${item.status === "Rejected" && "text-red-500 bg-red-100/60"}
                                        `}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full
                                                ${item.status === "pending" && "bg-yellow-500"}
                                                ${item.status === "Accepted" && "bg-green-500"}
                                                ${item.status === "Rejected" && "bg-red-500"}
                                            `}
                                        ></span>
                                        <h2 className="text-sm font-normal">{item.status}</h2>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-3">
                                        <Link to={`/dashboard/update-session/${item._id}`}
                                        disabled={item.status === 'Accepted'}
                                         className="btn bg-yellow-100/60 text-yellow-600"><MdModeEditOutline /></Link>
                                        <button
                                        onClick={()=>handleDelete(item._id)}
                                         disabled={item.status === 'Accepted' ||item.status === 'pending'}
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

export default AllSession;