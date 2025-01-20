import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { VscCodeReview } from "react-icons/vsc";
import { MdDetails } from "react-icons/md";
import UseAuth from "../../../Hooks/UseAuth";
import toast from "react-hot-toast";

const ViewBookedSession = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const [modalData, setModalData] = useState(null); // State for modal data
    const [paymentData, setPaymentData] = useState({}); // State for payment data
    const [review, setReview] = useState(""); // State for review input
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for review submission

    const { data: bookedSession = [] } = useQuery({
        queryKey: ["bookedSession"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/view/booked/session?email=${user.email}`);
            return data;
        },
    });

    const handleDetailClick = async (item) => {
        setModalData(item); // Set the selected session as modal data
        const { data } = await axiosSecure.get(`/payment-intent/${item.studySessionId}`);
        setPaymentData(data);
    };

    const closeModal = () => {
        setModalData(null); // Close modal
        setReview(""); // Clear review input
    };

    const handleReviewSubmit = async () => {
        if (!review.trim()) {
            toast.error("Please enter a review before submitting.");
            return;
        }

        setIsSubmitting(true);

        const reviewData = {
            sessionId: modalData.studySessionId,
            userEmail: user.email, // User email from authentication
            comment: review,
        };

        try {
            await axiosSecure.post("/reviews", reviewData);
            toast.success("Review submitted successfully!");
            setReview(""); // Clear the input field after submission
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1 className="text-center font-bold text-4xl text-slate-700 py-10">
                My Booked Sessions
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
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                        <button
                            className="absolute top-4 right-4 text-red-500 font-bold text-xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            Session Details
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Session Info */}
                            <div>
                                <p>
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
                                </p>
                            </div>
                            {/* Payment Info */}
                            <div>
                                <p>
                                    <strong>Student Email:</strong> {paymentData.studentEmail}
                                </p>
                                <p>
                                    <strong>Session ID:</strong> {paymentData.sessionId}
                                </p>
                                <p>
                                    <strong>Transaction ID:</strong> {paymentData.transectionId}
                                </p>
                                <p>
                                    <strong>Payment Amount:</strong> ${paymentData.amount}
                                </p>
                                <p>
                                    <strong>Currency:</strong> {paymentData.currency}
                                </p>
                            </div>
                        </div>
                        {/* Review Section */}
                        <div className="mt-6 border-t pt-4">
                            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Write your comment here..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                            <button
                                className={`btn btn-primary mt-4 ${
                                    isSubmitting ? "loading" : ""
                                }`}
                                onClick={handleReviewSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </button>
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
