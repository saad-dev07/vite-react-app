import axios from 'axios';

// axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // Replace with your token storage method
        if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
