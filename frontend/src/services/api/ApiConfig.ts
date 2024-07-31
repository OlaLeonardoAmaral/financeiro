import axios from "axios";

export const Api = () => {
    const api = axios.create({
        baseURL: `${process.env.BACKEND_URL}`
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    return api;
}
