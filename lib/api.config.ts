import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../app/store';
import { API_ENDPOINT } from './constants';
import { setTokens } from '../app/features/authSlice';

const api: AxiosInstance = axios.create({
    baseURL: API_ENDPOINT,
});

api.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalReq = error.config;

        if (error.response.status === 401 && !originalReq._retry) {
            originalReq._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(`${API_ENDPOINT}/token/refresh/`, { refresh: refreshToken });
                    const { access, refresh } = response.data;
                    store.dispatch(setTokens({ access, refresh }));
                    await AsyncStorage.setItem('refreshToken', refresh);
                    await AsyncStorage.setItem('accessToken', access);
                    return api(originalReq);
                } else {
                    console.error("No refresh token!");
                }
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
            }
        }

        return Promise.reject(error);
    }
)

export default api;