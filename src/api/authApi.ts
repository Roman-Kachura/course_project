import {$api} from './api';
import {AxiosResponse} from 'axios';

export const authApi = {
    registration(data: RegistrationValuesType) {
        return $api.post<AxiosResponse>('/users/registration', data);
    },
    login(data: LoginValuesType) {
        return $api.post<AxiosResponse>('/users/login', data);
    },
    logout(id: string) {
        return $api.delete<AxiosResponse, AxiosResponse<{}>>(`/users/logout/${id}`);
    },
    remove(id: string) {
        return $api.delete<AxiosResponse, AxiosResponse<{}>>(`/users/remove/${id}`);
    }
}

export type RegistrationValuesType = LoginValuesType & {
    name: string
}

export type LoginValuesType = {
    email: string
    password: string
}
export type AuthResponseType = {
    token: string
    user: UserResponseType
}
export type UserResponseType = {
    id: string
    name: string
    email: string
    role: string
    photo: string
    rated:{id:string,value:number}[]
}
export type ErrorResponseType = {
    status: number
    errors: any[]
}