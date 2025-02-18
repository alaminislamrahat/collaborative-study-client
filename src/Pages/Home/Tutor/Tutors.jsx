import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import SingleTutor from "./SingleTutor";

const Tutors = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: roleData, isLoading } = useQuery({
        queryKey: ["tutor"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/tutor");
            return data;
        },
    });

    if (isLoading) {
        return <div className="text-center py-10 text-gray-500">Loading tutors...</div>;
    }

    const tutors = roleData?.filter((item) => item.role === "teacher");

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                Meet Our Tutors
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tutors?.map((item) => (
                    <SingleTutor item={item} key={item._id} />
                ))}
            </div>
        </div>
    );
};

export default Tutors;
