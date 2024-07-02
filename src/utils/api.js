import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

api.interceptors.response.use(
    (config) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            config.headers['set-cookie'] = `Bearer ${token.split('=')[1]}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
