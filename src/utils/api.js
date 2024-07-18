import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials=true;
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// const navigate = useNavigate();

// Request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // navigate('/');
            window.location.href('/');
        }
        return Promise.reject(error);
    }
);

export default api;
