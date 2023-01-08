import {$api} from './api';
import {AxiosResponse} from 'axios';

export const commentsApi = {
    getComments(id: string, page: number) {
        return $api.get<AxiosResponse, AxiosResponse<CommentType[]>>(`/comments/${id}?page=${page}`);
    },
    createComment(data: CreateCommentValuesType) {
        return $api.post<AxiosResponse, AxiosResponse<CommentType>>(`/comments`, data);
    },
    deleteComment(data: DeleteCommentValuesType) {
        return $api.delete<AxiosResponse, AxiosResponse<CommentType>>(`/comments/${data.id}/${data.authorID}`);
    }
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

export type CreateCommentValuesType = { reviewID: string, authorID: string, text: string };
export type DeleteCommentValuesType = { id: string, authorID: string };