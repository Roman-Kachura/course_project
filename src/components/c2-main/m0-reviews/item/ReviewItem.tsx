import React, {SyntheticEvent, useEffect, useRef} from 'react';
import style from '../Reviews.module.scss';
import {NavLink, useParams} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../../../store/store';
import {useSelector} from 'react-redux';
import {ReviewType} from '../../../../api/reviewApi';
import {Button, Figure} from 'react-bootstrap';
import {Rating} from '@mui/material';
import {
    changeRatingThunk,
    deleteItemThunk,
    getIsRate,
    getReviewsItemThunk
} from '../../../../store/reducers/showReviewReducer';
import {CommentType} from '../../../../api/commentsApi';
import {Comments} from '../../m5-comments/Comments';
import {AddComment} from '../../m5-comments/AddComment';
import {UserResponseType} from '../../../../api/authApi';
import {rewriteDate} from '../../../../features/rewriteDate';
import {getCommentsThunk} from '../../../../store/reducers/commentsReducer';

export const ReviewItem = React.memo(() => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const item = useSelector<RootState, ReviewType>(state => state.showReviewReducer.item);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const myRate = useSelector<RootState, number>(state => state.showReviewReducer.myRate);
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const comments = useSelector<RootState, CommentType[]>(state => state.commentsReducer.comments);
    const {
        name,
        image,
        rating,
        text,
        hashtags,
        category,
        author,
        feedbacks,
        authorRating,
        product,
        created,
        authorID
    } = item;
    const changeRating = (event: SyntheticEvent<Element, Event>, value: number | null) => {
        if (typeof value === 'number' && id) {
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
            dispatch(getReviewsItemThunk({id, userID: !!user ? user.id : ''}));
        }
        const intervalID = setInterval(() => {
            id && dispatch(getCommentsThunk({id}));
            console.log('interval')
        }, 5000);
        return () => clearInterval(intervalID);
    }, []);
    return (
        <div className={style.reviews}>
            <Figure className={style.item}>
                <NavLink to={`/reviews/${id}`}>
                    <Figure.Image
                        className={style.image}
                        alt={name}
                        src={image}
                    />
                </NavLink>
                <div className={style.info}>
                    <div className={style.general}>
                        {name && <h3 className={style.name}>{name}</h3>}
                        {rating !== null && rating !== undefined && <div className={style.rating}>
                            {
                                !user || user.id === authorID
                                    ? <Rating max={5} readOnly={true} value={rating}/>
                                    : <Rating max={5} readOnly={!!myRate} value={rating} onChange={changeRating}/>
                            }
                            {rating !== 0 && <span className={style.text}>{rating}</span>}
                        </div>}
                        {
                            isAuth && feedbacks !== null && feedbacks !== undefined &&
                            <div className={style.feedbacks}>
                                People rated: <b>{feedbacks}</b>
                                {user.id === authorID ? null : !!myRate ? <span> / Your rating: <b>{myRate}</b></span> :
                                    <span> / You didn't rate this review!</span>}
                            </div>
                        }
                        {product && <div className={style.product}>PRODUCT: {product}</div>}
                        {author && authorRating &&
                            <div className={style.author}>AUTHOR: @{author} / AUTHOR RATING: {authorRating}</div>}
                        {category && <div className={style.category}>category: {category}</div>}
                        {hashtags && <div className={style.hashtags}>{hashtags.join(' ')}</div>}
                    </div>
                    {created && <div className={style.created}>CREATED: {rewriteDate(created)}</div>}
                </div>
            </Figure>
            {text && <div className={style.description}>
                <h4>Description</h4>
                <div>{text}</div>
            </div>}
            {comments.length > 0 ? <Comments comments={comments} userID={user ? user.id : undefined}/> : null}
            {isAuth && <AddComment reviewID={item.id} authorID={user.id}/>}
        </div>
    )
});





