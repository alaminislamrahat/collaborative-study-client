import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

const SingleTutor = ({ item }) => {
    const { email, name, photo, role } = item;

    return (
        <motion.div
            className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Image Section */}
            <div className="relative">
                <img className="w-full h-80 object-cover" src={photo} alt={name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
                <p className="text-sm text-gray-600">{email}</p>

                {/* Role Badge */}
                <div className="mt-3">
                    <span className="px-4 py-1 bg-[#71A45E] text-white text-sm font-medium rounded-full shadow-md">
                        {role}
                    </span>
                </div>

                {/* Static Description */}
                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                    A passionate educator with expertise in interactive learning and student growth. 
                    Dedicated to making education engaging and effective.
                </p>

                {/* Social Icons */}
                <div className="mt-4 flex justify-center gap-4">
                    <a href="#" className="text-gray-600 hover:text-[#71A45E] transition-all text-xl">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-[#71A45E] transition-all text-xl">
                        <FaLinkedinIn />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-[#71A45E] transition-all text-xl">
                        <FaTwitter />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-[#71A45E] transition-all text-xl">
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default SingleTutor;
