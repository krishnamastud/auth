import axios from 'axios';
import {store} from "./store.js";

const api = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true,
})


api.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

    return config;
    },
    (error) => Promise.reject(error)
);



export default api;