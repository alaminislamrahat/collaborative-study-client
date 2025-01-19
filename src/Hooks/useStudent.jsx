import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const useStudent = () => {
    const {user,loading} = UseAuth();
    const axiosSecure = UseAxiosSecure()

    const {data:isStudent, isPending : isStudentLoading} = useQuery({
        queryKey : [user?.email,'isStudent'],
        enabled : !loading,
        queryFn : async()=>{
            const {data} = await axiosSecure.get(`/user/student/${user.email}`)
            console.log(data)
            return data.student
        }
    })
    return {isStudent,isStudentLoading}
};


export default useStudent;