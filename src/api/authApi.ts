import {$api} from './api';
import {AxiosResponse} from 'axios';

export const authApi = {
    registration(data: RegistrationValuesType) {
        return $api.post<AxiosResponse,AxiosResponse<AuthResponseType>>('/users/registration', data);
    },
    social(data: authWithSocialValuesType) {
        return $api.post<AxiosResponse,AxiosResponse<AuthResponseType>>('/users/social', data);
    },
    login(data: LoginValuesType) {
        return $api.post<AxiosResponse,AxiosResponse<AuthResponseType>>('/users/login', data);
    },
    logout(id: string) {
        return $api.delete<AxiosResponse, AxiosResponse<{}>>(`/users/logout/${id}`);
    },
    remove(id: string) {
        return $api.delete<AxiosResponse, AxiosResponse<{}>>(`/users/remove/${id}`);
    }
}

export type RegistrationValuesType = LoginValuesType & {
    name: string,
    uid: string,
}

export type authWithSocialValuesType = {
    displayName:string
    email:string
    photoURL:string
    uid:string

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
    uid: string
    name: string
    email: string
    role: string
    photo: string
    rated: { id: string, value: number }[]
}
export type ErrorResponseType = {
    status: number
    errors: any[]
}