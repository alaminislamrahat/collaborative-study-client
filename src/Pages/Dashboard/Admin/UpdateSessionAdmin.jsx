import toast from "react-hot-toast";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

const UpdateSessionAdmin = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const data = useLoaderData();
    const navigate = useNavigate();
    // console.log(data)

    // Initialize formData with default values from the data object
    const [formData, setFormData] = useState({
        sessionTitle: data.sessionTitle || '',
        tutorName: data.tutorName || user?.displayName || '',
        tutorEmail: data.tutorEmail || user?.email || '',
        sessionDescription: data.sessionDescription || '',
        registrationStartDate: data.registrationStartDate || '',
        registrationEndDate: data.registrationEndDate || '',
        classStartDate: data.classStartDate || '',
        classEndDate: data.classEndDate || '',
        sessionDuration: data.sessionDuration || '',
        registrationFee: data.registrationFee || 0,
        status: data.status || 'pending', // Default status from the server or fallback
    });
 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            const response = await axiosSecure.put(`/update/session/admin/${data._id}`, formData);
            if (response.data) {
                toast.success('Session updated successfully');
                setFormData((prevFormData) => ({
                    sessionTitle: '',
                    tutorName: user?.displayName || '',
                    tutorEmail: user?.email || '',
                    sessionDescription: '',
                    registrationStartDate: '',
                    registrationEndDate: '',
                    classStartDate: '',
                    classEndDate: '',
                    sessionDuration: '',
                    registrationFee: 0,
                    status: prevFormData.status, // Preserve the current status
                }));
                navigate('/dashboard/view-all-session')
            }
        } catch (error) {
            console.error('Error updating session:', error);
            toast.error('Failed to update session. Please try again.');
        }
    };

    return (
        <div className="mb-6 max-w-4xl mx-auto bg-white shadow-lg rounded p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Update Study Session</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Session Title */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="sessionTitle">Session Title</label>
                    <input
                        type="text"
                        id="sessionTitle"
                        name="sessionTitle"
                        value={formData.sessionTitle}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Tutor Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tutor Name</label>
                    <input
                        type="text"
                        name="tutorName"
                        value={formData.tutorName}
                        readOnly
                        className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Tutor Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tutor Email</label>
                    <input
                        type="email"
                        name="tutorEmail"
                        value={formData.tutorEmail}
                        readOnly
                        className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Session Description */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="sessionDescription">Session Description</label>
                    <textarea
                        id="sessionDescription"
                        name="sessionDescription"
                        value={formData.sessionDescription}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        rows="4"
                        required
                    />
                </div>

                {/* Registration Start Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Registration Start Date</label>
                    <input
                        type="date"
                        name="registrationStartDate"
                        value={formData.registrationStartDate}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Registration End Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Registration End Date</label>
                    <input
                        type="date"
                        name="registrationEndDate"
                        value={formData.registrationEndDate}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Class Start Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Class Start Date</label>
                    <input
                        type="date"
                        name="classStartDate"
                        value={formData.classStartDate}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Class End Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Class End Date</label>
                    <input
                        type="date"
                        name="classEndDate"
                        value={formData.classEndDate}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Session Duration */}
                <div>
                    <label className="block text-sm font-medium mb-1">Session Duration</label>
                    <input
                        type="text"
                        name="sessionDuration"
                        value={formData.sessionDuration}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Registration Fee */}
                <div>
                    <label className="block text-sm font-medium mb-1">Registration Fee</label>
                    <input
                        type="number"
                        name="registrationFee"
                        value={formData.registrationFee}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 bg-gray-100"
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Update Session
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateSessionAdmin;
