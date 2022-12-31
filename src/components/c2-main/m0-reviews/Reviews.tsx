import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../store/store';
import {getReviewsThunk, ReviewsInitialStateType} from '../../../store/reducers/reviewsReducer';
import {useSelector} from 'react-redux';
import style from './Reviews.module.scss';
import {AppPagination} from '../../с9-additions/AppPagination';
import {SearchPanel} from './SearchPanel';
import {ReviewCover} from './ReviewCover';
import {SearchType} from '../../../api/reviewApi';
import {UserResponseType} from '../../../api/authApi';
import {setIsResetThunk} from '../../../store/reducers/showReviewReducer';
import {setAppStatus} from '../../../store/reducers/appReducer';

export const Reviews = React.memo(({isAuthor}: ReviewsType) => {
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const categories = useSelector<RootState, string[]>(state => state.categoriesReducer.categories);
    const dispatch = useAppDispatch();
    const getReviewsForEffect = () => {
        if (isAuthor) {
            getMyReviews();
        } else {
            getReviews(1, search);
        }
    }
    const getReviews = (currentPage: number, search: SearchType) => dispatch(getReviewsThunk({
        currentPage,
        search: {...search, authorID: isAuthor ? user.id : ''}
    }));
    const getMyReviews = () => dispatch(getReviewsThunk({currentPage: 1, search: {...search, authorID: user.id}}));
    const changePage = (currentPage: number) => dispatch(getReviewsThunk({
        currentPage,
        search: {...search, authorID: isAuthor ? user.id : ''}
    }));
    const changeSearchValue = (search: SearchType) => dispatch(getReviewsThunk({
        currentPage: 1,
        search: {...search, authorID: isAuthor ? user.id : ''}
    }));
    const hashtagSearch = (hashtag: string) => dispatch(getReviewsThunk({
        currentPage: 1,
        search: {...search, value: hashtag}
    }));
    const {
        reviews,
        sort,
        pagesCount,
        currentPage,
        search
    } = useSelector<RootState, ReviewsInitialStateType>(state => state.reviewsReducer);
    useEffect(() => {
        dispatch(setIsResetThunk());
        dispatch(setAppStatus('stop'));
        getReviewsForEffect();
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

type ReviewsType = {
    isAuthor?: boolean
}




