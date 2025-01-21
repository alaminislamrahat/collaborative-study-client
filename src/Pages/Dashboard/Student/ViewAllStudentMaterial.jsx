import { useState, useEffect } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const ViewAllStudentMaterial = () => {
    const [bookedSessions, setBookedSessions] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const axiosSecure = UseAxiosSecure()
    const {user} = UseAuth()
    // Fetch booked sessions on component mount
    useEffect(() => {
        const fetchBookedSessions = async () => {
            try {
                const {data} = await axiosSecure.get(`/view/booked/session?email=${user.email}`); // Replace with your API endpoint
                
                setBookedSessions(data);
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };

        fetchBookedSessions();
    }, [axiosSecure, user?.email]);

    // Fetch materials for a specific session
    const fetchMaterials = async (sessionId) => {
        try {
            const {data} = await axiosSecure.get(`/all-material-student?sessionId=${sessionId}`); // Replace with your API endpoint
           
            setMaterials(data);
            setSelectedSession(sessionId);
        } catch (error) {
            console.error("Error fetching materials:", error);
        }
    };
console.log(bookedSessions)
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Study Materials</h1>

            {/* List of Booked Sessions */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Booked Sessions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookedSessions.map((session) => (
                        <div
                            key={session._id}
                            className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                            onClick={() => fetchMaterials(session.studySessionId)}
                        >
                            <h3 className="text-lg font-medium">{session.sessionTitle}</h3>
                            <p className="text-sm text-gray-600">{session.classStartDate}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* List of Materials for Selected Session */}
            {selectedSession && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">
                        Materials for Session {selectedSession}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {materials.map((material) => (
                            <div
                                key={material._id}
                                className="p-4 border rounded-lg shadow"
                            >
                                <img
                                    src={material.image}
                                    alt={material.title}
                                    className="w-full h-40 object-cover rounded mb-2"
                                />
                                <h3 className="text-lg font-medium">{material.title}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <a
                                        href={material.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View on Google Drive
                                    </a>
                                    <a
                                        href={material.image}
                                        download
                                        className="px-3 py-1 bg-green-500 text-white text-sm rounded"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAllStudentMaterial;
