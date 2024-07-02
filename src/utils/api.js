import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => {
        // Check if the response contains a token in cookies
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
            // Parse the token from the cookie header
            const token = setCookieHeader.split('; ')[0].split('=')[1];
            document.cookie = `token=${token}; Path=/; Domain=pronet-node-api.vercel.app; Secure; SameSite=None`;
            // Store the token in cookies or localStorage as needed
            // Example: document.cookie = `token=${token}; Path=/; Domain=your-domain.com; Secure; SameSite=None`;
            // Replace with your actual storage mechanism
            
            // Optionally, you can also set the token in Axios headers for subsequent requests
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// api.interceptors.response.use(
//     (config) => {
//         const token = document.cookie.split('; ').find(row => row.startsWith('token='));
//         if (token) {
//             config.headers['set-cookie'] = `Bearer ${token.split('=')[1]}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;
