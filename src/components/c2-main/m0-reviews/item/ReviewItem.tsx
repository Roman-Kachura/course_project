import React, {SyntheticEvent, useEffect} from 'react';
import style from '../Reviews.module.scss';
import {NavLink, useParams} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../../../store/store';
import {useSelector} from 'react-redux';
import {ReviewType} from '../../../../api/reviewApi';
import {Button, Figure} from 'react-bootstrap';
import {Rating} from '@mui/material';
import {changeRatingThunk, getIsRate, getReviewsItemThunk} from '../../../../store/reducers/showReviewReducer';
import {CommentType} from '../../../../api/commentsApi';
import {Comments} from '../../m5-comments/Comments';
import {AddComment} from '../../m5-comments/AddComment';
import {UserResponseType} from '../../../../api/authApi';
import {rewriteDate} from '../../../../features/rewriteDate';
import {getCommentsThunk} from '../../../../store/reducers/commentsReducer';
import {LangType} from '../../../../store/reducers/appReducer';

export const ReviewItem = React.memo(() => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const language = useSelector<RootState, LangType>(state => state.appReducer.language);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const item = useSelector<RootState, ReviewType>(state => state.showReviewReducer.item);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const myRate = useSelector<RootState, number>(state => state.showReviewReducer.myRate);
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const comments = useSelector<RootState, CommentType[]>(state => state.commentsReducer.comments);
    const page = useSelector<RootState, number>(state => state.commentsReducer.page);
    const pagesCount = useSelector<RootState, number>(state => state.commentsReducer.pagesCount);
    const count = useSelector<RootState, number>(state => state.commentsReducer.count);
    const showMoreComments = (page: number) => {
        id && dispatch(getCommentsThunk({id, page}))
    }
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
    }, [id])

    useEffect(() => {
        const intervalID = setInterval(() => {
            id && dispatch(getCommentsThunk({id, page}));
        }, 5000);
        return () => {
            clearInterval(intervalID)
        };
    }, [page]);
    return (
        <div className={isDarkTheme ? style.reviews : `${style.reviews} ${style.light}`}>
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
                                {language === 'RU' ? 'Оценок' : 'People rated'}: <b>{feedbacks}</b>
                                {user.id === authorID ? null : !!myRate ? <span> / {language === 'RU' ? 'Ваша оценка' : 'Your rating'}: <b>{myRate}</b></span> :
                                    <span> / {language === 'RU' ? 'Вы не ставили оценку этому обзору!' : `You didn't rate this review!`}</span>}
                            </div>
                        }
                        {product && <div className={style.product}>{language === 'RU' ? 'ПРОДУКТ' : 'PRODUCT'}: {product}</div>}
                        {author && authorRating &&
                            <div className={style.author}>
                                {language === 'RU' ? 'АВТОР: ' : 'AUTHOR: '}
                                <NavLink to={`/users/${authorID}`}>@{author}</NavLink> / {language === 'RU' ? ' ОЦЕНКА АВТОРА' : ' AUTHOR RATING'}: {authorRating}</div>
                        }
                        {category && <div className={style.category}>{language === 'RU' ? 'КАТЕГОРИЯ' : 'CATEGORY'}: {category}</div>}
                        {hashtags && <div className={style.hashtags}>{hashtags.join(' ')}</div>}
                    </div>
                    {created && <div className={style.created}>{language === 'RU' ? 'ОПУБЛИКОВАНО' : 'CREATED'}: {rewriteDate(created)}</div>}
                </div>
            </Figure>
            {text && <div className={style.description}>
                <h4>{language === 'RU' ? 'Описание' : 'Description'}</h4>
                <div>{text}</div>
            </div>}
            {
                comments.length > 0
                    ? <Comments
                        comments={comments}
                        userID={user ? user.id : undefined}
                        page={page}
                        count={count}
                        pagesCount={pagesCount}
                        callBack={showMoreComments}
                    />
                    : null
            }
            {isAuth && <AddComment reviewID={item.id} authorID={user.id}/>}
        </div>
    )
});





