import {$api} from './api';
import {AxiosResponse} from 'axios';

export const reviewApi = {
    getReviews(currentPage: number, search: SearchType) {
        const {value, sort, category, authorID} = search;
        const searchValue = value.charAt(0) === '#' ? '' : value;
        const hashtag = value.charAt(0) === '#' ? value.slice(1) : '';
        const url = `/reviews?currentPage=${currentPage}&sort=${sort}&category=${category}&search=${searchValue}&hashtags=${hashtag}&author=${authorID || ''}`;
        return $api.get<AxiosResponse, AxiosResponse<ReviewResponseType>>(url)
    },
    getReviewsItem(id: string) {
        return $api.get<AxiosResponse, AxiosResponse<ReviewType>>(`/reviews/${id}`);
    },
    getReviewsItemMyRating(userID: string, reviewID: string) {
        return $api.get<AxiosResponse, AxiosResponse<number>>(`/rating?id=${reviewID}&user=${userID}`);
    },
    changeReviewsItemRating(reviewID: string, userID: string, value: number) {
        const url = `/rating?id=${reviewID}&user=${userID}&value=${value}`
        return $api.post<AxiosResponse, AxiosResponse<ChangeRatingResolveType>>(url);
    },
    createReview(form: FormData) {
        return $api.post('/reviews/create', form);
    },
    deleteReview(id: string, authorID: string) {
        return $api.delete(`/reviews/${id}/${authorID}`);
    },
    editReview(form: FormData) {
        return $api.post('/reviews/edit', form);
    },
    getRatedReviews(data: { id: string, currentPage: number, sort: string, category: string }) {
        const {id, category, currentPage, sort} = data
        return $api.get(`/reviews/profile/${id}?page=${currentPage}&category=${category}&sort=${sort}`);
    }
}

export type ReviewType = {
    id: string,
    name: string,
    product: string,
    author: string
    authorID: string,
    authorRating: number,
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
    sort: string[]
    search: SearchType
}

export type SearchType = {
    value: string
    category: string
    sort: string
    hashtags?: string
    authorID?: string
}

export type ChangeRatingResolveType = {
    isRate: boolean
    rating: number
}