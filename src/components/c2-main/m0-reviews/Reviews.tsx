import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../store/store';
import {clearReviewsThunk, getReviewsThunk, ReviewsInitialStateType} from '../../../store/reducers/reviewsReducer';
import {useSelector} from 'react-redux';
import style from './Reviews.module.scss';
import {AppPagination} from '../../с9-additions/AppPagination';
import {SearchPanel} from './SearchPanel';
import {ReviewCover} from './ReviewCover';
import {SearchType} from '../../../api/reviewApi';
import {UserResponseType} from '../../../api/authApi';
import {useLocation} from 'react-router-dom';

export const Reviews = React.memo(() => {
    const local = useLocation();
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const dispatch = useAppDispatch();
    const clearReviews = () => dispatch(clearReviewsThunk());
    const getReviews = (currentPage: number, search: SearchType) => dispatch(getReviewsThunk({currentPage, search}));
    const getMyReviews = () => dispatch(getReviewsThunk({currentPage:1, search:{...search,authorID:user.id}}));
    const changePage = (currentPage: number) => dispatch(getReviewsThunk({currentPage, search}));
    const changeSearchValue = (search: SearchType) => dispatch(getReviewsThunk({currentPage: 1, search}));
    const hashtagSearch = (hashtag: string) => dispatch(getReviewsThunk({
        currentPage: 1,
        search: {...search, value: hashtag}
    }));
    const {
        reviews,
        categories,
        sort,
        pagesCount,
        currentPage,
        search
    }
        = useSelector<RootState, ReviewsInitialStateType>(state => state.reviewReducer);
    useEffect(() => {
        getReviews(1, search);
        return () => {
            clearReviews()
        };
    }, [dispatch]);

    return (
        <div className={style.reviews}>
            <SearchPanel categories={categories} sort={sort} callBack={changeSearchValue}/>
            <div className={style.container}>
                {reviews.map(r => <ReviewCover key={r.id} id={r.id} src={r.image} rating={r.rating} title={r.title}
                                               hashtags={r.hashtags} hashtagSearch={hashtagSearch}
                                               category={r.category}/>)}
            </div>
            <div className={style.pagination}>
                <AppPagination
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    callBack={changePage}
                />
            </div>
        </div>
    )
});




