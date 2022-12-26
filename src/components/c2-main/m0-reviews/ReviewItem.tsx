import React, {useEffect} from 'react';
import style from './Reviews.module.scss';
import {useLocation, useParams} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../../store/store';
import {getReviewsItemThunk} from '../../../store/reducers/reviewsReducer';
import {useSelector} from 'react-redux';
import {ReviewType} from '../../../api/reviewApi';
import {Figure} from 'react-bootstrap';
import {Rating} from '@mui/material';

export const ReviewItem = React.memo(() => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const item = useSelector<RootState, ReviewType>(state => state.reviewReducer.item);
    const {
        title,
        image,
        rating,
        text,
        hashtags,
        category,
        authorID,
        author
    } = item;
    useEffect(() => {
        id && dispatch(getReviewsItemThunk({id}))
    }, [id]);
    if (!!item) {
        return (
            <div className={style.item}>
                <Figure.Image
                    className={style.image}
                    alt={title}
                    src={image}
                />
                <div className={style.block}>
                    {title && <h5 className={style.title}>{title}</h5>}
                    {category && <div className={style.category}>Category: {category}</div>}
                    {rating &&
                        <div className={style.rating}><Rating value={rating} precision={.1} max={10} size="small"/>
                        </div>}
                    {text && <div className={style.text}>{text}</div>}
                    {hashtags && <div className={style.hashtags}>{hashtags.join(' ')}</div>}
                    {author && <div className={style.author}>@{author}</div>}
                </div>
            </div>
        )
    }
    return <div></div>
});