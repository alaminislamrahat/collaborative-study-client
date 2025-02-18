import { motion } from "framer-motion";

const AboutUs = () => {
    return (
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-100">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
                
                {/* Left Side - Image Animation */}
                <motion.div 
                    className="w-full md:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img 
                        src="https://i.ibb.co/XkVvhfWx/about.jpg" 
                        alt="Study Zone" 
                        className="w-full rounded-lg shadow-lg"
                    />
                </motion.div>

                {/* Right Side - Text Content Animation */}
                <motion.div 
                    className="w-full md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#71A45E] mb-4">
                        About Study Zone
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Study Zone is a leading online learning platform dedicated to providing 
                        high-quality education to students worldwide. Our goal is to make learning 
                        accessible, engaging, and effective for everyone.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        With expert instructors, interactive courses, and a rich library of educational 
                        resources, we empower students to achieve their academic and professional goals.
                    </p>

                    {/* Button Animation */}
                    <motion.button 
                        className="bg-[#71A45E] text-white px-6 py-3 rounded-lg shadow-md 
                                   hover:bg-[#5A8B4C] transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Learn More
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutUs;
