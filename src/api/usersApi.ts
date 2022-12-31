import {$api} from './api';
import {AxiosResponse} from 'axios';
import {UserResponseType} from './authApi';

export const usersApi = {
    getUsers(currentPage?: number) {
        return $api.get<AxiosResponse, AxiosResponse<UserResponseType>>(`/users?page=${currentPage}`);
    },
    getUser(id: string) {
        return $api.get<AxiosResponse, AxiosResponse<UserResponseType>>(`/users/${id}`);
    },
    changeUserData(form: FormData) {
        return $api.post<AxiosResponse, AxiosResponse<UserResponseType>>('/users/setting', form);
    }
}