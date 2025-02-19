import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const UserProfile = () => {
    const {user} = UseAuth()
    const axiosSecure = useAxiosSecure();
    const { data: userData, isLoading, isError } = useQuery({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/profile/${user.email}`);
            return data;
        },
    });
console.log(user)
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError || !user) {
        return <div className="flex justify-center items-center h-screen">Failed to load user data</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
                <img
                    src={userData.photo || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
                />
                <h2 className="text-xl font-bold mt-4">{userData.name}</h2>
                <p className="text-gray-500">{userData.email}</p>
                <span className="inline-block bg-blue-500 text-white px-4 py-1 rounded-lg mt-3">
                    {userData.role || "User"}
                </span>
            </div>
        </div>
    );
};

export default UserProfile;
