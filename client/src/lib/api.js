import axios from 'axios';

// Ensure this matches your PHP backend URL
// If in production (built), look for the API relative to the client folder
// Assuming directory structure: /root/client_build/index.html and /root/api/public/index.php
// The API is at ../../api/public from the client URL perspective? 
// No, if user accesses localhost/Project/client/dist/, API is localhost/Project/api/public/
// If in production, dynamically find the API based on current location
// Logic: Application is in .../client/dist, API is in .../api/public
const getApiUrl = () => {
    // If we're on a production build (dist), use relative paths
    if (import.meta.env.PROD) {
        return window.location.origin + window.location.pathname.split('/client/dist')[0] + '/api/public';
    }

    // In DEV mode (Vite):
    // 1. Check for environment variable
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // 2. Default to port 8000 for standard 'php -S localhost:8000 -t api/public'
    // If you are using XAMPP for dev, change this to 'http://localhost/Python-Detective-Game/api/public'
    return 'http://localhost:8000';
};

const API_URL = getApiUrl();

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
