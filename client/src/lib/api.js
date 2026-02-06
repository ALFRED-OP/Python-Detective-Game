import axios from 'axios';

// Ensure this matches your PHP backend URL
// If in production (built), look for the API relative to the client folder
// Assuming directory structure: /root/client_build/index.html and /root/api/public/index.php
// The API is at ../../api/public from the client URL perspective? 
// No, if user accesses localhost/Project/client/dist/, API is localhost/Project/api/public/
const API_URL = import.meta.env.PROD
    ? '../../api/public'
    : 'http://localhost:8000'; // Dev mode uses standalone PHP server

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
