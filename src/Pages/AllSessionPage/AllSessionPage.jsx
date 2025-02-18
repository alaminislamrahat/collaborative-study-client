
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";



const AllSessionPage = () => {
    const axiosPublic = UseAxiosPublic()
    const [session, setSession] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1)
  
   
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');
    const [count, setCount] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosPublic.get(`/all-session-card?page=${currentPage}&size=${itemsPerPage}&search=${search}`)
            setSession(data)

        }
        getData()
    }, [axiosPublic, currentPage,  itemsPerPage, search, ])
    useEffect(() => {
        const getCount = async () => {
            const { data } = await axiosPublic(`/session-count?search=${search}`)

            setCount(data.count)
        }
        getCount()
    }, [axiosPublic, search])
    // console.log(count)  

    const numberOfPage = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPage).keys()].map(e => e + 1)

    // handle pagination button 
    const handlePagination = (value) => {
        setCurrentPage(value)
    }


    const handleReset = () => {
        
       
        setSearchText('');
        setSearch('');

    }

    const handleSearch = e => {
        e.preventDefault();

        setSearch(searchText)
    }
    // console.log(search)

    return (
        <div className='container px-6 py-10  mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
            <div>
                <div className='flex flex-col md:mt-14 md:flex-row justify-center items-center gap-5 '>
                    <div>
                      
                    </div>

                    <form onSubmit={handleSearch}>
                        <div className='flex p-1  overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                            <input
                                onChange={e => setSearchText(e.target.value)}
                                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                type='text'
                                name='search'
                                placeholder='search with session Title'
                                aria-label='Enter Job Title'
                            />

                            <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#72a55f] rounded-md hover:bg-[#aad09a] focus:bg-gray-600 focus:outline-none'>
                                Search
                            </button>
                        </div>
                    </form>
                    <div>
                        
                    </div>
                    <button
                        onClick={handleReset}
                        className='btn'>Reset</button>
                </div>
                <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {session.map(item => (
                        <Card item={item} key={item._id} />
                    ))}
                </div>
            </div>

            <div className='flex justify-center mt-12'>
                {/* previous btn  */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePagination(currentPage - 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#8bc874]  hover:text-white'>
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>

                        <span className='mx-1'>previous</span>
                    </div>
                </button>
                {/* numbers  btns*/}
                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePagination(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? 'bg-[#8bc874] text-white' : ''} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-[#8bc874]  hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
                {/* next btns  */}
                <button
                    disabled={currentPage === numberOfPage}
                    onClick={() => handlePagination(currentPage + 1)}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-[#8bc874] disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default AllSessionPage;