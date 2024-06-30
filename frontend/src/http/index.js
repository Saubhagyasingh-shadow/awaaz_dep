import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
});

// List of all the endpoints
export const activate = (data) => api.post('/api/activate', data);
export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const logout = () => api.post('/api/logout');
export const createRoom = (data) => api.post('/api/rooms', data);
export const getAllRooms = () => api.get('/api/rooms');
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);

// Interceptors
api.interceptors.response.use(
    (response) => {
        console.log('Response received:', response);
        return response;
    },
    async (error) => {
        console.log('Error encountered:', error);
        console.log('hello');
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
            console.log('401 error detected');
            originalRequest._isRetry = true;
            try {
                console.log('Attempting to refresh token...');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
                    withCredentials: true,
                });

                console.log('Token refreshed successfully:', response.data);

                // Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError.message);
                console.error('Refresh error details:', refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
