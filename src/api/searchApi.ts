import {$api} from './api';
import {AxiosResponse} from 'axios';
import {SearchListType} from '../store/reducers/searchReducer';

export const searchApi = {
    getHelpText(value: string) {
        return $api.post<AxiosResponse,AxiosResponse<SearchListType>>('search', {value});
    }
}