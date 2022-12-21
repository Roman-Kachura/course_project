import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../store/store';
import {getReviewsThunk, ReviewsInitialStateType} from '../../../store/reducers/reviewsReducer';
import {useSelector} from 'react-redux';
import {Figure} from 'react-bootstrap';
import style from './Reviews.module.scss';
import {NavLink} from 'react-router-dom';
import {Rating} from '@mui/material';

export const Reviews = React.memo(() => {
    const dispatch = useAppDispatch();
    const reviewsReducer = useSelector<RootState, ReviewsInitialStateType>(state => state.reviewReducer);
    useEffect(() => {
        dispatch(getReviewsThunk());
    }, []);
    return (
        <div className={style.reviews}>
            <div className={style.container}>
                {
                    reviewsReducer.reviews.map(
                        r => <ReviewCover
                            key={r.id}
                            id={r.id}
                            src={r.image}
                            rating={r.rating}
                            title={r.title}
                        />
                    )
                }
            </div>
        </div>
    )
});

const ReviewCover: React.FC<ReviewCoverPropsType> = ({src, id, title, rating}) => {
    return (
        <Figure className={style.item}>
            <NavLink to={`/review/${id}`}>
                <Figure.Image
                    className={style.image}
                    alt={title}
                    src={src}
                />
            </NavLink>
            <div><Rating className={style.rating} value={rating} readOnly/></div>
            <Figure.Caption className={style.caption}>
                <NavLink to={`/review/${id}`} className={style.link}>
                    {title}
                </NavLink>
            </Figure.Caption>
        </Figure>
    );
}

type ReviewCoverPropsType = {
    src: string
    id: string
    rating: number
    title: string
}
