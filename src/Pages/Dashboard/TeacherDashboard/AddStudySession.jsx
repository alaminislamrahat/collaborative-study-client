import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AddStudySession = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const [formData, setFormData] = useState({
        sessionTitle: '',
        tutorName: '',
        tutorEmail: '',
        sessionDescription: '',
        registrationStartDate: '',
        registrationEndDate: '',
        classStartDate: '',
        classEndDate: '',
        sessionDuration: '',
        registrationFee: 0, // Read-only, default 0
        status: 'pending', // Default pending
    });

    // Update tutorName and tutorEmail when user is loaded
    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                tutorName: user.displayName || 'Tutor Name',
                tutorEmail: user.email || 'Tutor Email',
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosSecure.post('/addSession', formData);
            console.log(response.data);
            if (response.data) {
                toast.success('Session added successfully');
                // Optionally, reset form
                setFormData({
                    sessionTitle: '',
                    tutorName: user?.displayName || 'Tutor Name',
                    tutorEmail: user?.email || 'Tutor Email',
                    sessionDescription: '',
                    registrationStartDate: '',
                    registrationEndDate: '',
                    classStartDate: '',
                    classEndDate: '',
                    sessionDuration: '',
                    registrationFee: 0,
                    status: 'pending',
                });
            }
        } catch (error) {
            console.error('Error adding session:', error);
            toast.error('Failed to add session. Please try again.');
        }
    };

    return (
        <div className="mb-6 max-w-4xl mx-auto bg-white shadow-lg rounded p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Add Study Session</h2>
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
                        readOnly
                        className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Add Session
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudySession;
