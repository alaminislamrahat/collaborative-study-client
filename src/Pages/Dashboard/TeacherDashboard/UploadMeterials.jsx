import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";

const UploadMaterials = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const { data: materials } = useQuery({
        queryKey: ["material"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allSession/tutor?email=${user.email}`);
            return data;
        },
    });

    const material = materials?.filter((item) => item.status === "Accepted");

    const handleOpenModal = (session) => {
        setSelectedSession(session);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSession(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const materialData = Object.fromEntries(formData.entries())
        console.log("Form Data:", materialData);
        try {
            const { data } = await axiosSecure.post(`/upload/material`,materialData)
            console.log(data);
            toast.success('Material upload successfully')
        }
        catch (err) {
            console.log(err)
            toast.error(err)
        }

        // Add API call here to submit the material
        handleCloseModal();
    };

    return (
        <div>
            <h1 className="text-center font-bold text-4xl text-slate-700 py-10">
                Upload Materials
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
                        {material?.map((item, idx) => (
                            <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.sessionTitle}</td>
                                <td>{item.tutorName}</td>
                                <td>{item.sessionDuration}</td>
                                <td>{item.registrationFee}</td>
                                <td>
                                    <div
                                        className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
                                        ${item.status === "Accepted" && "text-green-500 bg-green-100/60"}
                                    `}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full
                                            ${item.status === "Accepted" && "bg-green-500"}
                                        `}
                                        ></span>
                                        <h2 className="text-sm font-normal">{item.status}</h2>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className="text-yellow-600 bg-yellow-100/60 btn"
                                        onClick={() => handleOpenModal(item)}
                                    >
                                        <FiUpload />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-xl font-bold mb-4">Upload Material</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter material title"
                                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Study Session ID</label>
                                <input
                                    type="text"
                                    name="studySessionId"
                                    value={selectedSession?._id || ""}
                                    readOnly
                                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Tutor Email</label>
                                <input
                                    type="email"
                                    name="tutorEmail"
                                    value={user?.email || ""}
                                    readOnly
                                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                                />
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium">
                                    Image
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    id="title"
                                    placeholder="Enter Image Link"
                                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="link" className="block text-sm font-medium">
                                    Google Drive Link
                                </label>
                                <input
                                    type="url"
                                    name="link"
                                    id="link"
                                    placeholder="Enter Google Drive link"
                                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#77ACB5] text-white rounded"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadMaterials;
