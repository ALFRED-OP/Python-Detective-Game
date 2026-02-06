import axios from 'axios';

// Ensure this matches your PHP backend URL
const API_URL = 'http://localhost:8000/api/public'; // Assuming PHP built-in server

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor to handle errors gracefully
api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error.response ? error.response.data : error);
    }
);

export default api;
