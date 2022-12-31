import {$api} from './api';
import {AxiosResponse} from 'axios';

export const categoryApi = {
    createCategory(category: string) {
        return $api.post<AxiosResponse, AxiosResponse<{ categories: string[] }>>('/categories', {category});
    },
    getCategories() {
        return $api.get<AxiosResponse, AxiosResponse<{ categories: string[] }>>('/categories');
    }
}