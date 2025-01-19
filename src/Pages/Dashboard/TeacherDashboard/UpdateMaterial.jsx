import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";

const UpdateMaterial = () => {
    const data = useLoaderData();
    const { image, link, studySessionId, title, tutorEmail, _id } = data;
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        image,
        link,
        title,
        tutorEmail,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const { data } = await axiosSecure.put(`/update/material/${_id}`, formData)
            console.log(data);
            toast.success('data updated successfully')
            navigate('/dashboard/all-materials')
        }
        catch (error) {
            console.log(error)
            toast.error(error)
        }

    }


    return (
        <div className="  mx-12 mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Update Material</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="link" className="block text-sm font-medium">
                        Material Link
                    </label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tutorEmail" className="block text-sm font-medium">
                        Tutor Email
                    </label>
                    <input
                        readOnly

                        type="email"
                        id="tutorEmail"
                        name="tutorEmail"
                        value={formData.tutorEmail}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border cursor-not-allowed border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Update Material
                </button>
            </form>
        </div>
    );
};

export default UpdateMaterial;
