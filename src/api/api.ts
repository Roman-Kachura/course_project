import axios, {AxiosRequestConfig} from 'axios';
// https://course-server-sr6p.onrender.com/
// http://localhost:5000/
export const $api = axios.create({
    baseURL: 'https://course-server-sr6p.onrender.com/',
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
