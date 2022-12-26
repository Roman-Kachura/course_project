import React, {useEffect} from 'react';
import style from './Reviews.module.scss';
import {useParams} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../../store/store';
import {useSelector} from 'react-redux';
import {ReviewType} from '../../../api/reviewApi';
import {Figure} from 'react-bootstrap';
import {Rating} from '@mui/material';
import {getReviewsCommentsThunk, getReviewsItemThunk} from '../../../store/reducers/showReviewReducer';
import {CommentType} from '../../../api/commentsApi';

export const ReviewItem = React.memo(() => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const item = useSelector<RootState, ReviewType>(state => state.showReviewReducer.item);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const comments = useSelector<RootState, CommentType[]>(state => state.showReviewReducer.comments);
    const {
        title,
        image,
        rating,
        text,
        hashtags,
        category,
        author
    } = item;
    useEffect(() => {
        if (id) {
            dispatch(getReviewsItemThunk({id}));
            dispatch(getReviewsCommentsThunk({id}));
        }
    }, [id]);
    if (!!item) {
        return (
            <div className={style.review}>
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
                            <div className={style.rating}>
                                <Rating value={rating} precision={.1} max={10} size="small" readOnly={!isAuth}/>
                            </div>}
                        {text && <div className={style.text}>{text}</div>}
                        {hashtags && <div className={style.hashtags}>{hashtags.join(' ')}</div>}
                        {author && <div className={style.author}>@{author}</div>}
                    </div>
                </div>
                <div className={style.comments}>
                    {comments.map(c => <div>{c.id}</div>)}
                </div>
            </div>
        )
    }
    return <div></div>
});