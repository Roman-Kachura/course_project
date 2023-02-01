import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import style from '../Reviews.module.scss';
import {NavLink, useParams} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../../../store/store';
import {useSelector} from 'react-redux';
import {ReviewType} from '../../../../api/reviewApi';
import {Figure} from 'react-bootstrap';
import {Rating} from '@mui/material';
import {changeRatingThunk, getIsRate, getReviewsItemThunk} from '../../../../store/reducers/showReviewReducer';
import {CommentType} from '../../../../api/commentsApi';
import {Comments} from '../../m5-comments/Comments';
import {AddComment} from '../../m5-comments/AddComment';
import {UserResponseType} from '../../../../api/authApi';
import {rewriteDate} from '../../../../features/rewriteDate';
import {messageHandlerThunk} from '../../../../store/reducers/commentsReducer';
import {ItemText} from './ItemText';
import {changeReviewTextThunk} from '../../../../store/reducers/reviewsReducer';
import {useT} from '../../../../i18n';
import {wsApi} from '../../../../api/wsApi';

export const ReviewItem = React.memo(() => {
    const t = useT();
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const item = useSelector<RootState, ReviewType>(state => state.showReviewReducer.item);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const myRate = useSelector<RootState, number>(state => state.showReviewReducer.myRate);
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const comments = useSelector<RootState, CommentType[]>(state => state.commentsReducer.comments);
    const page = useSelector<RootState, number>(state => state.commentsReducer.page);
    const pagesCount = useSelector<RootState, number>(state => state.commentsReducer.pagesCount);
    const count = useSelector<RootState, number>(state => state.commentsReducer.count);
    const [webSocket, setWebSocket] = useState<null | WebSocket>(null);
    const linkRef: React.LegacyRef<HTMLAnchorElement> = useRef(null);

    const onChangeText = (value: string) => {
        id && dispatch(changeReviewTextThunk({id, authorID, value}));
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

    const onClickLinkRefHandler = () => {
        if (linkRef.current) {
            linkRef.current.click()
        }
    }

    const createWebSocket = () => {
        setWebSocket(wsApi.createSocket('comments'));
    }
    const closeHandler = () => {
        setTimeout(() => {
            createWebSocket();
        }, 3000)
    }
    const openHandler = (ws: WebSocket) => {
        id && wsApi.connect(ws, id, page);
    }
    const messageHandler = (message: string) => {
        dispatch(messageHandlerThunk({message}))
    }
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
    }, [id]);

    const createComment = (text: string) => {
        webSocket?.removeEventListener('close', closeHandler);
        const ws = wsApi.createSocket('comments');
        setWebSocket(ws);
        if (webSocket) {
            user.id && webSocket.send(JSON.stringify({
                reviewID: id,
                authorID: user.id,
                text,
                method: 'create-comment'
            }));
        }
        onClickLinkRefHandler();
    }


    const deleteComment = (cid: string) => {
        webSocket?.removeEventListener('close', closeHandler);
        const ws = wsApi.createSocket('comments');
        setWebSocket(ws);
        if (webSocket) {
            user.id && webSocket.send(JSON.stringify({
                reviewID: id,
                id: cid,
                authorID: user.id,
                method: 'delete-comment'
            }));
        }
        onClickLinkRefHandler();
    }

    const showMoreComments = (page: number) => {
        webSocket?.removeEventListener('close', closeHandler);
        const ws = wsApi.createSocket('comments');
        setWebSocket(ws);
        if (webSocket) {
            user.id && webSocket.send(JSON.stringify({
                id,
                page,
                method: 'connect'
            }));
        }
    }

    useEffect(() => {
        webSocket?.removeEventListener('close', closeHandler);
        const ws = wsApi.createSocket('comments');
        setWebSocket(ws);
        ws.addEventListener('close', closeHandler);
        return ws.removeEventListener('close', closeHandler);
    }, [])

    useEffect(() => {
        if (webSocket) {
            webSocket.addEventListener('open', () => openHandler(webSocket));
            webSocket.addEventListener('message', (message) => messageHandler(message.data));
            return () => {
                webSocket.removeEventListener('open', () => openHandler(webSocket));
                webSocket.removeEventListener('message', (message) => messageHandler(message.data));
            }
        }
    }, [webSocket]);

    return (
        <div className={isDarkTheme ? style.reviews : `${style.reviews} ${style.light}`}>
            <a href="#comments" ref={linkRef}/>
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
                                {t('RATED')}: <b>{feedbacks}</b>
                                {user.id === authorID ? null : !!myRate ?
                                    <span> / {t('YOUR_RATING')}: <b>{myRate}</b></span> :
                                    <span> / {t('NOT_RATED')}</span>}
                            </div>
                        }
                        {product &&
                            <div className={style.product}>{t('PRODUCT_TEXT')}: {product}</div>}
                        {author && authorRating &&
                            <div className={style.author}>
                                {t('AUTHOR_TEXT')}
                                <NavLink
                                    to={`/users/${authorID}`}>@{author}</NavLink> / {t('AUTHOR_RATING')}: {authorRating}
                            </div>
                        }
                        {category && <div
                            className={style.category}>{t('CATEGORY_TEXT')}: {category}</div>}
                        {hashtags && <div className={style.hashtags}>{hashtags.join(' ')}</div>}
                    </div>
                    {created && <div
                        className={style.created}>{t('CREATED_TEXT')}: {rewriteDate(created)}</div>}
                </div>
            </Figure>
            {text && <div className={style.description}>
                <h4>{t('DESCRIPTION_TEXT')}</h4>
                {(isAuth && (user.role === 'ADMIN' || user.id === authorID)) ?
                    <ItemText text={text} callback={onChangeText}/> :
                    <div className={style.text}>{text}</div>}
            </div>}

            {
                comments.length > 0
                    ? <div id="comments"><Comments
                        comments={comments}
                        userID={user ? user.id : undefined}
                        page={page}
                        count={count}
                        pagesCount={pagesCount}
                        callBack={showMoreComments}
                        deleteCommentCallBack={deleteComment}
                    /></div>
                    : null
            }
            {isAuth && <AddComment reviewID={item.id} authorID={user.id} callBack={createComment}/>}
        </div>
    )
});





