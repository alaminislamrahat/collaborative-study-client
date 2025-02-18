import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Make sure this is correctly imported
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const OurStudentSay = () => {
    const axiosSecure = useAxiosSecure();
    const { data: roleData, isLoading } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/tutor");
            return data;
        },
    });

    if (isLoading) {
        return <div className="text-center py-10 text-gray-500">Loading student reviews...</div>;
    }

    const students = roleData?.filter((item) => item.role === "student");

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                What Our Students Say
            </h1>

            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 4000, // Auto-slide every 4 seconds
                    disableOnInteraction: false, // Keep autoplay even if the user interacts
                }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]} // Ensure modules are used here
            >
                {students?.map((student) => (
                    <SwiperSlide key={student._id}>
                        <motion.div
                            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center 
                                       transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            {/* Student Image */}
                            <img className="w-24 h-24 object-cover rounded-full border-4 border-[#71A45E]" src={student.photo} alt={student.name} />

                            {/* Student Info */}
                            <h2 className="text-xl font-semibold text-gray-900 mt-4">{student.name}</h2>
                            <p className="text-sm text-gray-600">{student.email}</p>

                            {/* Review Text */}
                            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                                "This platform has transformed my learning experience. The courses are interactive, and the community support is amazing!"
                            </p>

                            {/* Star Rating */}
                            <div className="flex mt-3 text-yellow-500 text-lg">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalfAlt />
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default OurStudentSay;
