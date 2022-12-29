import React, {SyntheticEvent, useEffect} from 'react';
import style from './Reviews.module.scss';
import {useParams} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../../store/store';
import {useSelector} from 'react-redux';
import {ReviewType} from '../../../api/reviewApi';
import {Figure} from 'react-bootstrap';
import {Rating} from '@mui/material';
import {
    changeRatingThunk,
    clearReviewsItemThunk,
    getIsRate,
    getReviewsCommentsThunk,
    getReviewsItemThunk
} from '../../../store/reducers/showReviewReducer';
import {CommentType} from '../../../api/commentsApi';
import {Comments} from '../m5-comments/Comments';
import {AddComment} from '../m5-comments/AddComment';
import {UserResponseType} from '../../../api/authApi';

export const ReviewItem = React.memo(() => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const item = useSelector<RootState, ReviewType>(state => state.showReviewReducer.item);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const isRate = useSelector<RootState, boolean>(state => state.showReviewReducer.isRate);
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const comments = useSelector<RootState, CommentType[]>(state => state.showReviewReducer.comments);
    const {title, image, rating, text, hashtags, category, author} = item;
    const clearReviewsItem = () => dispatch(clearReviewsItemThunk());
    const changeRating = (event: SyntheticEvent<Element, Event>, value: number | null) => {
        if (typeof value === 'number' && id){
            dispatch(changeRatingThunk({
                reviewID: id,
                userID: user.id,
                value: Math.ceil(value)
            }));
            dispatch(getIsRate({reviewID: id, userID: user.id}));
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(getReviewsItemThunk({id}));
            dispatch(getReviewsCommentsThunk({id}));
            if (user) {
                dispatch(getIsRate({reviewID: id, userID: user.id}));
            }
        }
        return () => {
            clearReviewsItem();
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
                        {
                            <div className={style.rating}>
                                {!isAuth && <Rating
                                    value={rating}
                                    precision={.1}
                                    max={10}
                                    size="small"
                                    readOnly={!isAuth}

                                />}
                                {isAuth && <Rating
                                    value={rating}
                                    precision={.1}
                                    max={10}
                                    size="small"
                                    readOnly={isRate}
                                    onChange={changeRating}
                                />}
                            </div>
                        }
                        {text && <div className={style.text}>{text}</div>}
                        {hashtags && <div className={style.hashtags}>{hashtags.join(' ')}</div>}
                        {author && <div className={style.author}>@{author}</div>}
                    </div>
                </div>
                {comments.length > 0 ? <Comments comments={comments}/> : null}
                {isAuth && <AddComment/>}
            </div>
        )
    }
    return <div></div>
});