import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../store/store';
import {getReviewsThunk, ReviewsInitialStateType} from '../../../store/reducers/reviewsReducer';
import {useSelector} from 'react-redux';
import style from './Reviews.module.scss';
import {AppPagination} from '../../с9-additions/AppPagination';
import {ReviewCover} from './ReviewCover';
import {SearchType} from '../../../api/reviewApi';
import {UserResponseType} from '../../../api/authApi';
import {setIsResetThunk} from '../../../store/reducers/showReviewReducer';
import {LangType, setAppStatus} from '../../../store/reducers/appReducer';
import {SearchParamsType} from '../../../store/reducers/searchReducer';

export const Reviews = React.memo(({isAuthor}: ReviewsType) => {
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const dispatch = useAppDispatch();
    const language = useSelector<RootState, LangType>(state => state.appReducer.language);
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
    const getMyReviews = () => dispatch(getReviewsThunk({currentPage: 1, search: {...search, authorID: user ? user.id : ''}}));
    const changePage = (currentPage: number) => dispatch(getReviewsThunk({
        currentPage,
        search: {...search, authorID: isAuthor ? user.id : ''}
    }));
    const hashtagSearch = (hashtag: string) => dispatch(getReviewsThunk({
        currentPage: 1,
        search: {...search, value: hashtag}
    }));
    const {
        reviews,
        pagesCount,
        currentPage
    } = useSelector<RootState, ReviewsInitialStateType>(state => state.reviewsReducer);
    const search = useSelector<RootState, SearchParamsType>(state => state.searchListReducer.params);
    useEffect(() => {
        dispatch(setIsResetThunk());
        dispatch(setAppStatus('stop'));
        getReviewsForEffect();
    }, [dispatch]);

    return (
        <div className={style.reviews}>
            <div className={style.container}>
                {
                    reviews.map(
                        r =>
                            <ReviewCover
                                key={r.id}
                                id={r.id}
                                src={r.image}
                                rating={r.rating}
                                authorRating={r.authorRating}
                                name={r.name}
                                product={r.product}
                                hashtags={r.hashtags}
                                hashtagSearch={hashtagSearch}
                                category={r.category}
                                created={r.created}
                                authorID={r.authorID}
                                user={user}
                                language={language}
                            />
                    )
                }
            </div>
            <div className={style.pagination}>
                {
                    pagesCount > 1 &&
                    <AppPagination
                        pagesCount={pagesCount}
                        currentPage={currentPage}
                        callBack={changePage}
                    />
                }
            </div>
        </div>
    )
});

type ReviewsType = {
    isAuthor?: boolean
}




