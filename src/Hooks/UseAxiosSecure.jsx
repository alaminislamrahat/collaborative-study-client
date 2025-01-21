import axios from "axios";

import { useNavigate } from "react-router-dom";
import UseAuth from "./useAuth";



const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const { logOut } = UseAuth();
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log('iterceptor', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error)
    })


    // response interceptors 
    axiosSecure.interceptors.response.use(function (response) {

        return response;
    }, async function (error) {
        const status = error.response.status;
        // console.log('in the interceptor error', status)
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;