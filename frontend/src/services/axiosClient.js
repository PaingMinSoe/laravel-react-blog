import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api",
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});