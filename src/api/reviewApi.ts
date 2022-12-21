import {$api} from './api';
import {AxiosResponse} from 'axios';

export const reviewApi = {
    getReviews() {
        return $api.get<AxiosResponse, AxiosResponse<ReviewResponseType>>('/reviews')
    }
}

export type ReviewType = {
    id: string,
    title: string,
    authorID: string,
    text: string,
    rating: number,
    image: string
    feedbacks: number,
    hashtags: string[],
    category: string
}
export type ReviewResponseType = {
    reviews: ReviewType[]
    currentPage: number
    pagesCount: number
}