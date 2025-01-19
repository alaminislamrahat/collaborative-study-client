import { useLoaderData, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import useStudent from "../../Hooks/useStudent";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";

const DetailCard = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const data = useLoaderData();
    const { isStudent } = useStudent()
    const {
        sessionTitle,
        tutorName,
        tutorEmail,
        sessionDescription,
        registrationStartDate,
        registrationEndDate,
        classStartDate,
        classEndDate,
        sessionDuration,
        registrationFee,

        reviews,
        _id
    } = data;

    const allData = {
        sessionTitle,
        tutorName,
        tutorEmail,
        sessionDescription,
        registrationStartDate,
        registrationEndDate,
        classStartDate,
        classEndDate,
        sessionDuration,
        registrationFee, studentEmail: user?.email, StudentName: user?.displayName, studySessionId: _id
    }

    const handleBookNow = async () => {
        if (registrationFee === 0) {
            try {
                const { data } = await axiosSecure.post('/booking', allData);
                console.log(data)
                if(data.message){
                    toast.error('all ready exist')
                }
                else{
                    toast.success("Session booked successfully!");
                }
              
            }
            catch (error) {
                console.log(error);
                toast.error(error)
            }

        } else {
            navigate(`/dashboard/payment/${data._id}`);
        }
    };

    const isDisabled = isStudent ? 'Ongoing' : 'Closed ';

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto bg-white shadow-md rounded-md p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Session Details */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-800">{sessionTitle}</h1>
                        <span
                            className={`px-4 py-1 text-sm rounded-full ${isDisabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                        >
                            {isDisabled}
                        </span>
                    </div>
                    <p className="mt-4 text-gray-600">{sessionDescription}</p>
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800">Tutor Information</h2>
                        <p className="text-gray-600 mt-2">Name: {tutorName}</p>
                        <p className="text-gray-600">Email: {tutorEmail}</p>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-gray-700">Registration Period</h3>
                            <p className="text-gray-600">
                                {new Date(registrationStartDate).toLocaleDateString()} -{" "}
                                {new Date(registrationEndDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Class Period</h3>
                            <p className="text-gray-600">
                                {new Date(classStartDate).toLocaleDateString()} -{" "}
                                {new Date(classEndDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Duration</h3>
                            <p className="text-gray-600">{sessionDuration} hours</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Fee</h3>
                            <p className={`text-${registrationFee === 0 ? "green" : "red"}-600`}>
                                {registrationFee === 0 ? "Free" : `$${registrationFee}`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews and Booking */}
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
                    <div className="mt-4 space-y-4 overflow-y-auto h-52 border rounded-md p-4 bg-gray-50">
                        {reviews && reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="p-4 bg-white rounded-md shadow">
                                    <p className="text-gray-800 font-medium">{review.user}</p>
                                    <p className="text-gray-600 mt-2">{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No reviews yet.</p>
                        )}
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={handleBookNow}
                            disabled={!isDisabled}
                            className={`w-full px-6 py-3 text-white font-bold rounded-md ${!isDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-300 text-green-800 hover:bg-green-950"
                                }`}
                        >
                            {isDisabled
                                ? "Book Now"
                                : "Registration Closed"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCard;
