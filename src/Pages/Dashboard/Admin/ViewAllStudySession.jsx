import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";


const ViewAllStudySession = () => {

    const axiosSecure = UseAxiosSecure();

    const { data: studysession = [] } = useQuery({
        queryKey: ['studysession'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/allSession/admin')
            return data;
        }
    })


    const handleStatus = async (id, prevstatus, status) => {
        if (prevstatus === status) return toast.error('You have already done')
        // console.log(id, prevstatus, status)

        console.log(id,prevstatus,status)


    }

    console.log(studysession)
    return (
        <div>

            <h1 className="text-center font-bold text-4xl text-slate-700 py-10">All Session </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Session Title</th>
                            <th>Tutor Name</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            studysession.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.sessionTitle}</td>
                                <td> {item.tutorName} </td>
                                <td> {item.sessionDuration} </td>
                                <td> {item.status} </td>
                                <td >
                                    <div className="flex gap-5">
                                        <button
                                            disabled={item.status === 'Accepted'}
                                            onClick={() => handleStatus(item._id, item.status, 'Accepted')}
                                            className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth='1.5'
                                                stroke='currentColor'
                                                className='w-5 h-5'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='m4.5 12.75 6 6 9-13.5'
                                                />
                                            </svg>
                                        </button>


                                        <button
                                            disabled={item.status === 'Rejected'}
                                            onClick={() => handleStatus(item._id, item.status, 'Rejected')}
                                            className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth='1.5'
                                                stroke='currentColor'
                                                className='w-5 h-5'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                </td>



                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllStudySession;