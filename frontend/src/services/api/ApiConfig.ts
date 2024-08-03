import axios from "axios";
import { AuthService } from "./auth/AuthService";
import { ApiException } from "./ApiException";
import { paths } from '@/paths';
import Router from "next/router";

export const Api = () => {
    const api = axios.create({
        baseURL: `${process.env.BACKEND_URL}`,
        withCredentials: true
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('financeiro_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });


    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 403 && !originalRequest._retry) {
                originalRequest._retry = true;

                const refreshResponse = await AuthService.refreshToken();

                if (!(refreshResponse instanceof ApiException)) {
                    localStorage.setItem('financeiro_token', refreshResponse.token);
                    originalRequest.headers.Authorization = `Bearer ${refreshResponse.token}`;
                    return api(originalRequest);
                }

                localStorage.removeItem('financeiro_token');
                Router.replace(paths.auth.signIn);
            }
            return Promise.reject(error);
        }
    );


    return api;
}
