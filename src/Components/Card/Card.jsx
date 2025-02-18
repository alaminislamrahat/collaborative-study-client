import { Link } from "react-router-dom";

const Card = ({ item }) => {
    const { registrationEndDate, sessionTitle, sessionDescription ,_id} = item || {};

    // Determine if the session is ongoing or closed
    const isOngoing = new Date(registrationEndDate) > new Date();

    return (
        <div className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all'>
            <div className='flex items-center justify-between'>
                <span className='text-xs font-light text-gray-800 '>
                    {registrationEndDate}
                </span>
                <span className={`px-3 py-1 text-[8px] ${isOngoing ? 'text-blue-800 bg-blue-200' : 'bg-red-200 text-red-800'} uppercase  rounded-full`}>
                    {isOngoing ? 'Ongoing' : 'Closed'}
                </span>
            </div>

            <div>
                <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
                    {sessionTitle}
                </h1>

                <p title={sessionDescription} className='mt-2 text-sm text-gray-600 '>
                    {sessionDescription.substring(0, 30)}...
                </p>
                <Link to={`/detail/${_id}`}
                disabled={!isOngoing}
                 className="btn bg-[#72a55f]/80 mt-3 text-white btn-xs">Read More</Link>
            </div>
        </div>
    );
};

export default Card;
