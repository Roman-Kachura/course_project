import {$api} from './api';
import {AxiosResponse} from 'axios';

export const commentsApi = {
    getComments(id: string) {
        return $api.get<AxiosResponse, AxiosResponse<CommentType[]>>(`/comments/${id}`);
    }
}

export type CommentType = {
    id: string,
    author: {
        id: string,
        name: string,
        photo: string
    },
    reviewID: string,
    text: string,
    created: Date
}