import axios, {AxiosRequestConfig} from 'axios';

export const $api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    const app = localStorage.getItem('app');
    if (app) {
        const token = JSON.parse(app).authReducer.data.token;
        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }
    return config;
});
