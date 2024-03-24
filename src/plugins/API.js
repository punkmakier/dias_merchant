import axios from 'axios';

const API_BASE_URL = 'https://diasgame.com';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json' // Add this line for consistency
    }
});

export default axiosInstance;
