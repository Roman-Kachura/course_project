import React from 'react';
import style from './Profile.module.scss';
import {UserResponseType} from '../../../api/authApi';
import {Table} from 'react-bootstrap';
import {Rating} from '@mui/material';
import {ReviewType} from '../../../api/reviewApi';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {ProfileInitialStateType} from '../../../store/reducers/profileReducer';
import {AppPagination} from '../../с9-additions/AppPagination';
import {SortPanel} from '../m9-sort/SortPanel';
import {LangType} from '../../../store/reducers/appReducer';
import {NavLink} from 'react-router-dom';

export const UserRatedReviewsTable: React.FC<UserRatedReviewsTablePropsType> = (
    {
        isDarkTheme,
        getUserRatedReviews,
        language
    }
) => {
    const {
        pagesCount,
        currentPage,
        sort,
        category,
        ratedReviews
    } = useSelector<RootState, ProfileInitialStateType>(state => state.profileReducer);
    const sortVariants = useSelector<RootState, string[]>(state => state.reviewsReducer.sort);
    const changePage = (currentPage: number) => getUserRatedReviews(currentPage, sort, category);
    const sortUserReviews = (category: string, sort: string) => getUserRatedReviews(currentPage, sort, category);
    return (
        <div className={style.tableContainer}>
            <div className={style.wrapper}>
                <h4 className={style.title}>
                    {language === 'EN' && `Rated reviews`}
                    {language === 'RU' && `Оцененные обзоры`}
                </h4>
                <SortPanel sort={sortVariants} callBack={sortUserReviews} search={{sort, category}}/>
                <Table striped variant={isDarkTheme ? 'dark' : 'light'}>
                    <tbody>
                    {
                        ratedReviews.map(r => <UserReviewsTableRow r={r} key={r.id}/>)
                    }
                    </tbody>
                </Table>
                {pagesCount > 1 &&
                    <AppPagination pagesCount={pagesCount} currentPage={currentPage} callBack={changePage}/>}
            </div>
        </div>
    )
}

const UserReviewsTableRow: React.FC<UserRatedReviewTableRowPropsType> = ({r}) => {
    return (
        <tr key={r.id}>
            <td><img src={r.image} className={style.image}/></td>
            <td><NavLink to={`/reviews/${r.id}`}>{r.name}</NavLink></td>
            <td><Rating max={5} value={r.rating} readOnly={true}/></td>
        </tr>
    )
}

type UserRatedReviewsTablePropsType = {
    language:LangType
    isDarkTheme: boolean
    profile: UserResponseType
    getUserRatedReviews: (currentPage: number, sort: string, category: string) => void
}

type UserRatedReviewTableRowPropsType = {
    r: ReviewType,

}