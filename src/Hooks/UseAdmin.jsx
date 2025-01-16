import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const UseAdmin = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: isAmdin, isPending: isAmdinPending } = useQuery({
        queryKey: [user?.email, 'isTeacher'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/admin/${user.email}`)
            console.log(data)
            return data.teacher
        }
    })
    return { isAmdin, isAmdinPending }
};

export default UseAdmin;