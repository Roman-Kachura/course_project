import {$api} from './api';
import {AxiosResponse} from 'axios';

export const reviewApi = {
    getReviews(currentPage: number, search: SearchType) {
        const {value, sort, category} = search;
        const searchValue = value.charAt(0) === '#' ? '' : value;
        const hashtag = value.charAt(0) === '#' ? value.slice(1) : '';
        const url = `/reviews?currentPage=${currentPage}&sort=${sort}&category=${category}&search=${searchValue}&hashtags=${hashtag}`;
        return $api.get<AxiosResponse, AxiosResponse<ReviewResponseType>>(url)
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
    created: Date
}
export type ReviewResponseType = {
    reviews: ReviewType[]
    currentPage: number
    pagesCount: number
    categories: string[]
    sort: string[]
    search: SearchType
}

export type SearchType = {
    value: string
    category: string
    sort: string
    hashtags?:string
}