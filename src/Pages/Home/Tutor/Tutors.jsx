import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import SingleTutor from "./SingleTutor";


const Tutors = () => {
    const axiosSecure = UseAxiosSecure();

    const {data : roleData} = useQuery({
        queryKey : ['tutor'],
        queryFn : async () => {
            const {data} = await axiosSecure.get('/tutor')
            return data
        }
    })

    const tutor = roleData?.filter(item => item.role === 'teacher');
    console.log(tutor)
    return (
        <div className="">
            <h1 className="text-4xl font-bold text-center py-10">Our Tutors</h1>
            <div className="grid grid-cols-3 gap-6 justify-center items-center mb-4">
                {
                    tutor?.map(item => <SingleTutor item={item} key={item._id}/>)
                }
            </div>
        </div>
    );
};

export default Tutors;