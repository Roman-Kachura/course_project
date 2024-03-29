import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../store/store';
import {ReviewsInitialStateType} from '../../../store/reducers/reviewsReducer';
import {SearchParamsType} from '../../../store/reducers/searchReducer';
import style from './Profile.module.scss';
import {SortPanel} from '../m9-sort/SortPanel';
import {Button, Table} from 'react-bootstrap';
import {AppPagination} from '../../с9-additions/AppPagination';
import {deleteItemThunk} from '../../../store/reducers/showReviewReducer';
import {Rating} from '@mui/material';
import {UserResponseType} from '../../../api/authApi';
import {ReviewType} from '../../../api/reviewApi';
import {NavLink} from 'react-router-dom';
import {useT} from '../../../i18n';

export const UserReviewsTable: React.FC<UserReviewsTablePropsType> = (
    {isDarkTheme, getUserReviews, profile, user}
) => {
    const t = useT();
    const {
        reviews,
        sort,
        pagesCount,
        currentPage,
    } = useSelector<RootState, ReviewsInitialStateType>(state => state.reviewsReducer);
    const search = useSelector<RootState, SearchParamsType>(state => state.searchListReducer.params);
    const changePage = (currentPage: number) => getUserReviews(currentPage, search.sort, search.category);
    const sortUserReviews = (category: string, sort: string) => getUserReviews(currentPage, sort, category);
    useEffect(() => {
        getUserReviews(1, sort[0], '');
    }, [profile.id, sort.length, getUserReviews, sort])
    if(reviews.length === 0) return <></>
    return (
        <div className={style.tableContainer}>
            <div className={style.wrapper}>
                <h4 className={style.title}>{t('REVIEWS')}</h4>
                <SortPanel sort={sort} callBack={sortUserReviews} search={search}/>
                <Table striped variant={isDarkTheme ? 'dark' : 'light'} className={style.table}>
                    <tbody>
                    {
                        reviews.map(
                            r => <UserReviewsTableRow user={user} r={r} key={r.id}/>
                        )
                    }
                    </tbody>
                </Table>
                {pagesCount > 1 &&
                    <AppPagination pagesCount={pagesCount} currentPage={currentPage} callBack={changePage}/>}
            </div>
        </div>
    )
}

const UserReviewsTableRow: React.FC<UserReviewTableRowPropsType> = ({r, user}) => {
    const t = useT();
    const link = useRef<HTMLAnchorElement>(null);
    const dispatch = useAppDispatch();
    const deleteItem = (id: string, authorID: string) => {
        dispatch(deleteItemThunk({id, authorID}));
    }
    const getToEditMode = () => {
        link.current && link.current.click();
    }
    return (
        <tr key={r.id}>
            <td><img alt="" src={r.image} className={style.image}/></td>
            <td><NavLink to={`/reviews/${r.id}`}>{r.name}</NavLink></td>
            <td><Rating max={5} value={r.rating} readOnly={true}/></td>
            <td>
                {
                    user && user.id === r.authorID &&
                    <div className={style.btnBlock}>
                        <Button className={style.btn} variant="success"
                                onClick={getToEditMode}>
                            {t('EDIT_TEXT')}
                        </Button>
                        <Button className={style.btn} variant="danger"
                                onClick={() => deleteItem(r.id, r.authorID)}>
                            {t('DELETE_TEXT')}
                        </Button>
                    </div>
                }
                {
                    user && user.id !== r.authorID && user.role === 'ADMIN' &&
                    <div className={style.btnBlock}>
                        <Button className={style.btn} variant="outline-success" onClick={getToEditMode}>
                            {t('EDIT_TEXT')}
                        </Button>
                        <Button className={style.btn} variant="outline-danger"
                                onClick={() => deleteItem(r.id, r.authorID)}>
                            {t('DELETE_TEXT')}
                        </Button>
                    </div>
                }
                <NavLink to={`/reviews/edit/${r.id}`} ref={link}/>
            </td>
        </tr>
    )
}

type UserReviewsTablePropsType = {
    isDarkTheme: boolean
    getUserReviews: (currentPage: number, sort: string, category: string) => void
    profile: UserResponseType
    user: UserResponseType
}
type UserReviewTableRowPropsType = {
    r: ReviewType
    user: UserResponseType
}