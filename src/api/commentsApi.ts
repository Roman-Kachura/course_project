import {$api} from './api';
import {AxiosResponse} from 'axios';

export const commentsApi = {
    getComments(id: string, page: number) {
        return $api.get<AxiosResponse, AxiosResponse<CommentType[]>>(`/comments/${id}?page=${page}`);
    },
}

export type CommentType = {
    id: string,
    authorID: string
    reviewID: string,
    text: string,
    created?: Date
    author: AuthorType
}

export type AuthorType = {
    id: string,
    name: string,
    photo: string
}
export type DeleteCommentValuesType = { id: string, authorID: string };