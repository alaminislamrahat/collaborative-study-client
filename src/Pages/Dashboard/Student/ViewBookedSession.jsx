import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { VscCodeReview } from "react-icons/vsc";
import { MdDetails } from "react-icons/md";

const ViewBookedSession = () => {
    const axiosSecure = UseAxiosSecure();
    const [modalData, setModalData] = useState(null); // State for modal data
    const [paymentData, setPaymentData] = useState({}); // State for modal data

    const { data: bookedSession = [] } = useQuery({
        queryKey: ["bookedSession"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/view/booked/session");
            return data;
        },
    });

  
    

    // transectionId, amount, currency, status, sessionId, studentEmail 
    
    // console.log(paymentInfo)

    const handleDetailClick = async(item) => {
        setModalData(item); // Set the selected session as modal data
        const { data } = await axiosSecure.get(`/payment-intent/${item.studySessionId}`);
       console.log(data)
       setPaymentData(data)
       console.log(paymentData)
       
        
        
    };

    const closeModal = () => {
        setModalData(null); // Close modal
    };

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
                            <th>Class Start Date</th>
                            <th>Detail | Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedSession.map((item, idx) => (
                            <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.sessionTitle}</td>
                                <td>{item.tutorName}</td>
                                <td>{item.sessionDuration}</td>
                                <td>{item.registrationFee}</td>
                                <td>{item.classStartDate}</td>
                                <td>
                                    <div className="flex gap-3">
                                        <button
                                            className="btn bg-yellow-100/60 text-yellow-600"
                                            onClick={() => handleDetailClick(item)}
                                        >
                                            <MdDetails title="Details Icon" />
                                        </button>
                                        <button className="btn bg-red-100/60 text-red-600">
                                            <VscCodeReview />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-lg ">
                        <h2 className="text-xl font-bold mb-4 text-center">Session Details</h2>
                        <div className="grid grid-cols-2">
                            <div> <p>
                                <strong>Title:</strong> {modalData.sessionTitle}
                            </p>
                                <p>
                                    <strong>Tutor:</strong> {modalData.tutorName}
                                </p>
                                <p>
                                    <strong>Duration:</strong> {modalData.sessionDuration}
                                </p>
                                <p>
                                    <strong>Fee:</strong> ${modalData.registrationFee}
                                </p>
                                <p>
                                    <strong>Start Date:</strong> {modalData.classStartDate}
                                </p></div>
                            <div>
                                <p>
                                    <strong>studentEmail:</strong> {paymentData.studentEmail}
                                </p>
                                <p>
                                    <strong>sessionId:</strong> {paymentData.sessionId}
                                </p>
                                <p>
                                    <strong>transectionId:</strong> {paymentData.transectionId}
                                </p>
                                <p>
                                    <strong>Payment Amount</strong> ${paymentData.amount}
                                </p>
                                <p>
                                    <strong>currency:</strong> {paymentData.currency}
                                </p>
                            </div>
                        </div>
                        <button
                            className="btn bg-red-500 text-white mt-4"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBookedSession;
