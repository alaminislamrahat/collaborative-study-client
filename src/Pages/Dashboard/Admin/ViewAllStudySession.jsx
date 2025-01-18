import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const ViewAllStudySession = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedId, setSelectedId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const { data: studysession = [], refetch } = useQuery({
        queryKey: ["studysession"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/allSession/admin");
            return data;
        },
    });

    const handleStatus = async (id, prevstatus, status, isPaid, fee) => {
        if (prevstatus === status) {
            toast.error("You have already done this action.");
            return;
        }

        try {
            const payload = { status };
            if (isPaid) {
                payload.registrationFee = fee;
            }
            const { data } = await axiosSecure.put(`/status/${id}`, payload);
            console.log(data);
            toast.success("Status updated successfully!");
            refetch()

        } catch (err) {
            console.error(err);
            toast.error("Failed to update the status.");
        }
    };

    const openModal = (id, status) => {
        setSelectedId(id);
        setSelectedStatus(status);
        document.getElementById("my_modal_1").showModal();
    };


    // delete 
    const handleDelete = async(id) => {
        console.log(id);
        try{
            const {data} = await axiosSecure.delete(`/session/delete/admin/${id}`)
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
                                    <div className="flex gap-5">
                                        <button
                                            disabled={item.status === "Accepted"}
                                            onClick={() => openModal(item._id, item.status)}
                                            className="text-gray-500 transition-colors duration-200 hover:text-green-500 focus:outline-none"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m4.5 12.75 6 6 9-13.5"
                                                />
                                            </svg>
                                        </button>

                                        <button
                                            disabled={item.status === "Rejected"}
                                            onClick={() =>
                                                handleStatus(item._id, item.status, "Rejected")
                                            }
                                            className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-3">
                                        <Link to={`/dashboard/update-session-admin/${item._id}`}
                                            disabled={item.status === 'pending' || item.status === 'Rejected'}
                                            className="btn bg-yellow-100/60 text-yellow-600"><MdModeEditOutline /></Link>
                                        <button
                                            onClick={()=>handleDelete(item._id)}
                                            disabled={item.status === 'pending' || item.status === 'Rejected'}
                                            className="btn bg-red-100/60 text-red-600"><FaTrashAlt /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Is the session Free or Paid?</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const sessionType = e.target.sessionType.value;
                            const fee =
                                sessionType === "Paid"
                                    ? parseFloat(e.target.registrationFee.value || 0)
                                    : 0;



                            if (sessionType === "Paid" && fee <= 0) {
                                toast.error("Please specify a valid fee for paid sessions.");
                                return;
                            }

                            handleStatus(selectedId, selectedStatus, "Accepted", true, fee);
                            document.getElementById("my_modal_1").close();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex gap-4">
                            <label>
                                <input
                                    type="radio"
                                    name="sessionType"
                                    value="Free"
                                    className="radio radio-primary"
                                    defaultChecked
                                    onChange={() =>
                                    (document.getElementById(
                                        "registrationFeeContainer"
                                    ).style.display = "none")
                                    }
                                />
                                <span className="ml-2">Free</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="sessionType"
                                    value="Paid"
                                    className="radio radio-primary"
                                    onChange={() =>
                                    (document.getElementById(
                                        "registrationFeeContainer"
                                    ).style.display = "block")
                                    }
                                />
                                <span className="ml-2">Paid</span>
                            </label>
                        </div>

                        <div
                            id="registrationFeeContainer"
                            className="flex flex-col gap-2"
                            style={{ display: "none" }}
                        >
                            <label htmlFor="registrationFee" className="text-sm font-medium">
                                Registration Fee
                            </label>
                            <input
                                type="number"
                                name="registrationFee"
                                id="registrationFee"
                                placeholder="Enter fee amount"
                                className="input input-bordered"
                            />
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => document.getElementById("my_modal_1").close()}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ViewAllStudySession;
