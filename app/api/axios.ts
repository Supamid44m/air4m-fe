import axios from "axios";


const baseURL = process.env.NEXT_PUBLIC_BE_URL;

const axiosInstance= axios.create({
    baseURL,
    timeout: 1000,
});

export default axiosInstance;

axiosInstance.interceptors.request.use()