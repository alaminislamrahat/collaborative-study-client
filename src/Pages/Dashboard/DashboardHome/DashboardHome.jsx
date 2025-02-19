import { useQuery } from "@tanstack/react-query";
import UseAdmin from "../../../Hooks/UseAdmin";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useStudent from "../../../Hooks/useStudent";
import UseTeacher from "../../../Hooks/UseTeacher";
import { FaUsers, FaDollarSign, FaStar, FaChalkboardTeacher } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import UseAuth from "../../../Hooks/UseAuth";

const DashboardHome = () => {
    const {user} = UseAuth()
    const { isTeacher } = UseTeacher();
    const { isAdmin } = UseAdmin();
    const { isStudent } = useStudent();

    const axiosSecure = useAxiosSecure();

    const { data: chartData = {} } = useQuery({
        queryKey: ["order-stats"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/admin-stats");
            return data;
        }
    });
    const { data: studentData = {} } = useQuery({
        queryKey: ["student-stats"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/view/booked/session/${user.email}`);
            return data;
        }
    });

    const { users = 0, revenue = 0, review = 0, session = 0, booking = 0, activeUsers = 0, inactiveUsers = 0 } = chartData;

    const adminData = [
        { name: "Users", value: users },
        { name: "Revenue", value: revenue },
        { name: "Booking", value: booking },
        { name: "Sessions", value: session }
    ];

    const teacherData = [
        { name: "Revenue", value: revenue },
        { name: "Booking", value: booking },
        { name: "Reviews", value: review },
        { name: "Sessions", value: session }
    ];

    const userStateData = [
        { name: "Active Users", value: activeUsers },
        { name: "Inactive Users", value: inactiveUsers }
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div className="p-6 min-h-screen text-gray-800">
            <h1 className="text-3xl font-bold text-center mb-8 drop-shadow-lg">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    isAdmin && <div className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between text-gray-800 transform hover:scale-105 transition duration-300">
                    <FaUsers className="text-blue-500 text-4xl" />
                    <div>
                        <h2 className="text-2xl font-bold">{users}</h2>
                        <p className="text-gray-500">Total Users</p>
                    </div>
                </div>
                }
                <div className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between text-gray-800 transform hover:scale-105 transition duration-300">
                    <FaDollarSign className="text-green-500 text-4xl" />
                    <div>
                        <h2 className="text-2xl font-bold">${revenue}</h2>
                        <p className="text-gray-500">Total Revenue</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between text-gray-800 transform hover:scale-105 transition duration-300">
                    <FaStar className="text-yellow-500 text-4xl" />
                    <div>
                        <h2 className="text-2xl font-bold">{review}</h2>
                        <p className="text-gray-500">Total Reviews</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between text-gray-800 transform hover:scale-105 transition duration-300">
                    <FaChalkboardTeacher className="text-purple-500 text-4xl" />
                    <div>
                        <h2 className="text-2xl font-bold">{session}</h2>
                        <p className="text-gray-500">Total Sessions</p>
                    </div>
                </div>
            </div>
            <div className="mt-10 bg-white p-8 rounded-lg shadow-xl text-gray-800">
                <h2 className="text-2xl font-bold mb-4 text-center">Statistics Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={!isTeacher ? adminData : teacherData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                            <XAxis dataKey="name" tick={{ fill: '#4A90E2', fontSize: 14, fontWeight: 'bold' }} />
                            <YAxis tick={{ fill: '#4A90E2', fontSize: 14, fontWeight: 'bold' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#4A90E2" radius={[5, 5, 0, 0]} barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={!isTeacher ? adminData : teacherData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {(!isTeacher ? adminData : teacherData).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* User State Overview is only visible if the user is not a teacher */}
                {!isTeacher && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4 text-center">User State Overview</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={userStateData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                    {userStateData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;
