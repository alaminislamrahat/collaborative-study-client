import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";
import { useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";


const UpdateNote = () => {

    const data = useLoaderData();
    // console.log(data._id)
    const {id} = useParams();
    console.log(id)

    const { user } = UseAuth();
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const axiosSecure = UseAxiosSecure();

    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();

        const noteData = {
            email: user?.email,
            title,
            description,
           
        };

        // Post the note data to the server (adjust the endpoint URL as needed)
        try {
            const { data } = await axiosSecure.put(`/note-update-student/${id}`, noteData)
            console.log(data)
            toast.success('note post successfully')
            navigate('/dashboard/view-all-notes')
        }
        catch (err) {
            console.log(err)
            toast.error(err)
        }
    };
    
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Update a Note</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter note title"
                        className="w-full p-3 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter note description"
                        className="w-full p-3 border rounded-md"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Create Note
                </button>
            </form>
        </div>
    );
};

export default UpdateNote;