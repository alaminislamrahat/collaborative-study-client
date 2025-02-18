import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const UseTeacher = () => {
    const {user,loading} = UseAuth();
    const axiosSecure = UseAxiosSecure()

    const {data:isTeacher, isPending : isTeacherLoading} = useQuery({
        queryKey : [user?.email,'isTeacher'],
        enabled : !loading,
        queryFn : async()=>{
            const {data} = await axiosSecure.get(`/user/teacher/${user.email}`)
            // console.log(data)
            return data.teacher
        }
    })
    return {isTeacher,isTeacherLoading}
};

export default UseTeacher;