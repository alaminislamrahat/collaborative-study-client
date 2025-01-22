import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

// onClick={() =>
//     
// }


const ViewAllStudySession = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedId, setSelectedId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [reject, setReject] = useState({})

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

        if (status == 'Accepted') {
            try {
                const { data } = await axiosSecure.delete(`/reject/reason/${id}`)
                console.log(data)


            }
            catch (err) {
                console.log(err)
            }

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
    const handleDelete = async (id) => {
        console.log(id);
        try {
            const { data } = await axiosSecure.delete(`/session/delete/admin/${id}`)
            console.log(data);
            toast.success('Deleted successfully')
            refetch();
        }
        catch (err) {
            console.log(err);
            toast.error(err)
        }
    }

    const handleRejection = async (e) => {
        e.preventDefault();
        const form = e.target;
        const reason = form.reason.value;
        const feedback = form.feedback.value;
        console.log(reason, feedback)
        const rejectData = { reason, feedback, sessionId: reject._id }
        console.log(reject, 'from state')

        try {
            const { data } = await axiosSecure.post('/rejection/reason', rejectData)
            console.log(data)
            handleStatus(reject._id, reject.status, "Rejected")


        }
        catch (err) {
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
                                            onClick={() => {
                                                setReject(item);
                                                document.getElementById('my_modal_5').showModal();
                                                // Add your logic here
                                            }}
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
                                            onClick={() => handleDelete(item._id)}
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



            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Reject Study Session</h3>
                    <p className="py-2">Please provide the reason for rejection and feedback for the requester.</p>

                    {/* Form Section */}
                    <form
                        id="rejectionForm"
                        onSubmit={(e) => {
                            e.preventDefault(); // Prevent default form submission
                            handleRejection(e); // Call your rejection handler
                            document.getElementById("my_modal_5").close(); // Close the modal programmatically
                        }}
                    >
                        <div className="form-control mb-4">
                            <label htmlFor="reason" className="label">
                                <span className="label-text font-semibold">Rejection Reason</span>
                            </label>
                            <input
                                type="text"
                                id="reason"
                                name="reason"
                                placeholder="Enter the reason for rejection"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="feedback" className="label">
                                <span className="label-text font-semibold">Feedback</span>
                            </label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                placeholder="Enter feedback for the requester"
                                className="textarea textarea-bordered w-full"
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn btn-error">
                                Reject Session
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => document.getElementById("my_modal_5").close()} // Close modal on click
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
