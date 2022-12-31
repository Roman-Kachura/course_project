import React, {SyntheticEvent, useEffect, useRef} from 'react';
import style from './Reviews.module.scss';
import {NavLink, useParams} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../../store/store';
import {useSelector} from 'react-redux';
import {ReviewType} from '../../../api/reviewApi';
import {Button, Figure} from 'react-bootstrap';
import {Rating} from '@mui/material';
import {
    changeRatingThunk,
    deleteItemThunk,
    getIsRate,
    getReviewsItemThunk
} from '../../../store/reducers/showReviewReducer';
import {CommentType} from '../../../api/commentsApi';
import {Comments} from '../m5-comments/Comments';
import {AddComment} from '../m5-comments/AddComment';
import {UserResponseType} from '../../../api/authApi';

export const ReviewItem = React.memo(() => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const link = useRef<HTMLAnchorElement>(null);
    const item = useSelector<RootState, ReviewType>(state => state.showReviewReducer.item);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const myRate = useSelector<RootState, number>(state => state.showReviewReducer.myRate);
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const comments = useSelector<RootState, CommentType[]>(state => state.commentsReducer.comments);
    const {title, image, rating, text, hashtags, category, author, feedbacks} = item;
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

    const deleteItem = () => {
        dispatch(deleteItemThunk({id: item.id, authorID: user.id}));
        // @ts-ignore
        link.current.click();
    }

    useEffect(() => {
        if (id) {
            dispatch(getReviewsItemThunk({id, userID: !!user ? user.id : ''}));
        }
    }, []);
    return (
        <div className={style.review}>
            <div className={style.item}>
                <div className={style.firstBlock}>
                    <Figure.Image
                        className={style.image}
                        alt={title}
                        src={image}
                    />
                    {!!user && item.authorID === user.id &&
                        <div>
                            <Button variant={'danger'} onClick={deleteItem}>Delete review</Button>
                            <NavLink to={'/reviews'} ref={link}/>
                        </div>
                    }
                </div>
                <div className={style.block}>
                    {title && <h5 className={style.title}>{title}</h5>}
                    {category && <div className={style.category}>Category: {category}</div>}
                    {
                        rating !== undefined && rating !== null &&
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
                                readOnly={!!myRate}
                                onChange={changeRating}
                            />}
                        </div>
                    }
                    {
                        isAuth && feedbacks &&
                        <div className={style.feedbacks}>
                            People rated: <b>{feedbacks}</b> /
                             {!!myRate ? <span> Your rating: <b>{myRate}</b></span> : <span> You didn't rate this review!</span>}
                        </div>
                    }
                    {text && <div className={style.text}>{text}</div>}
                    {hashtags && <div className={style.hashtags}>{hashtags.join(' ')}</div>}
                    {author && <div className={style.author}>@{author}</div>}
                </div>
            </div>
            {comments.length > 0 ? <Comments comments={comments} userID={user ? user.id : undefined}/> : null}
            {isAuth && <AddComment reviewID={item.id} authorID={user.id}/>}
        </div>
    )
});





