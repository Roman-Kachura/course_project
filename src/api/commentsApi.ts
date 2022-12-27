import {$api} from './api';
import {AxiosResponse} from 'axios';

export const commentsApi = {
    getComments(id: string) {
        return $api.get<AxiosResponse, AxiosResponse<CommentType[]>>(`/comments/${id}`);
    }
}

export type CommentType = {
    id: string,
    authorID: string
    reviewID: string,
    text: string,
    created: Date
}

export type AuthorType = {
    id: string,
    name: string,
    photo: string
}