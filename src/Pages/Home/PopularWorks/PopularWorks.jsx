import { FaChalkboardTeacher, FaBook, FaLaptopCode, FaUsers } from "react-icons/fa";

const PopularWorks = () => {
    const sessions = [
        { 
            icon: <FaChalkboardTeacher className="text-4xl text-[#71A45E] mb-4 transition-all duration-300 group-hover:text-white" />, 
            title: "Live Tutoring", 
            description: "Join interactive live sessions with expert instructors for real-time learning." 
        },
        { 
            icon: <FaBook className="text-4xl text-[#71A45E] mb-4 transition-all duration-300 group-hover:text-white" />, 
            title: "Course Library", 
            description: "Access a vast collection of courses and study materials anytime, anywhere." 
        },
        { 
            icon: <FaLaptopCode className="text-4xl text-[#71A45E] mb-4 transition-all duration-300 group-hover:text-white" />, 
            title: "Coding Bootcamps", 
            description: "Participate in hands-on coding bootcamps to enhance your programming skills." 
        },
        { 
            icon: <FaUsers className="text-4xl text-[#71A45E] mb-4 transition-all duration-300 group-hover:text-white" />, 
            title: "Community Forums", 
            description: "Engage with peers and mentors in discussions, Q&A, and collaborative projects." 
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {sessions.map((session, index) => (
                <div 
                    key={index} 
                    className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col items-center 
                               transition-all duration-300 hover:bg-[#71A45E] hover:text-white group"
                >
                    {session.icon}
                    <h3 className="text-xl font-semibold mb-2 transition-all duration-300 group-hover:text-white">{session.title}</h3>
                    <p className="text-gray-600 transition-all duration-300 group-hover:text-white">{session.description}</p>
                </div>
            ))}
        </div>
    );
};

export default PopularWorks;
