import axios from "axios";

const axiosPublic = axios.create({
    baseURL : 'npm install axios'
})

const UseAxiosPublic = () => {
    return axiosPublic
};

export default UseAxiosPublic;