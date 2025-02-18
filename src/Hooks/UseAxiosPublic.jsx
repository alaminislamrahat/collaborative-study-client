import axios from "axios";

const axiosPublic = axios.create({
    baseURL : 'https://collaborative-study-platform-server-alpha.vercel.app'
})

const UseAxiosPublic = () => {
    return axiosPublic
};

export default UseAxiosPublic;