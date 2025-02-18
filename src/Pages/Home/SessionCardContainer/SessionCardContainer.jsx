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

    const allData = previousData.filter(item => item.status === 'Accepted');

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">All Sessions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    allData.slice(0, 6).map(item => (
                        <Card item={item} key={item._id} />
                    ))
                }
            </div>
        </div>
    );
};

export default SessionCardContainer;
