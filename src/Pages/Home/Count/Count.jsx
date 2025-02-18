import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaChalkboardTeacher, FaUserGraduate, FaCalendarAlt, FaBookOpen } from "react-icons/fa";

const Count = () => {
    const stats = [
        { icon: <FaChalkboardTeacher className="text-5xl text-[#71A45E]" />, label: "Teachers", value: 120 },
        { icon: <FaUserGraduate className="text-5xl text-[#71A45E]" />, label: "Students", value: 5000 },
        { icon: <FaCalendarAlt className="text-5xl text-[#71A45E]" />, label: "Events", value: 50 },
        { icon: <FaBookOpen className="text-5xl text-[#71A45E]" />, label: "Courses", value: 300 },
    ];

    return (
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-100">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {stats.map((stat, index) => (
                    <motion.div 
                        key={index} 
                        className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        {stat.icon}
                        <h3 className="text-4xl font-bold text-gray-800 mt-3">
                            <CountUp start={0} end={stat.value} duration={2} separator="," />
                        </h3>
                        <p className="text-gray-600 text-lg">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Count;
