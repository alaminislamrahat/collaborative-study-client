import { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle form submission (e.g., send it to an API)
        console.log("Form submitted:", formData);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                Contact Us
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column: Contact Form */}
                <div className="bg-white shadow-xl rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-600 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-600 mb-2">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                rows="5"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#71A45E] text-white px-6 py-2 rounded-md w-full"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Right Column: Contact Information */}
                <div className="bg-white shadow-xl rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
                    <p className="text-gray-600 mb-4">
                        We are located in the heart of the city. Reach out to us via the form or visit us in person.
                    </p>
                    <p className="text-gray-600 mb-4">
                        <strong>Address:</strong> 123 Learning St., Education City, ABC 1234
                    </p>
                    <p className="text-gray-600 mb-4">
                        <strong>Email:</strong> contact@studyzone.com
                    </p>
                    <p className="text-gray-600 mb-4">
                        <strong>Phone:</strong> +1 234 567 890
                    </p>

                    {/* Example Google Map Embed */}
                    <div className="mt-6">
                        <iframe
                            width="100%"
                            height="200"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2526.419764570424!2d-73.97765738401454!3d40.74881727932784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af5c3f0727%3A0x0c8e3f0c3f760dc0!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1624579364748!5m2!1sen!2sus"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
