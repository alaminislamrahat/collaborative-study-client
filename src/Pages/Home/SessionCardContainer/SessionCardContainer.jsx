import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Card from "../../../Components/Card/Card";


const SessionCardContainer = () => {
    const axiosPublic = UseAxiosPublic();
    const { data: previousData = [] } = useQuery({
        queryKey: ['cardData'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/all-session-card')
            return data;
        }
    })
    // console.log(allData)

    const allData = previousData.filter(item => item.status === 'Accepted')
    return (
        <div className=" container mx-auto py-3">
            <h1 className="text-4xl font-bold text-center py-10">All Session</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center justify-center ">
                {
                    allData.slice(0,6).map(item => <Card item={item} key={item._id}/>)
                }
            </div>
        </div>
    );
};

export default SessionCardContainer;