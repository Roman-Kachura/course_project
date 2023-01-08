import React, {MouseEvent, useRef} from 'react';
import {Button, Figure} from 'react-bootstrap';
import style from './Reviews.module.scss';
import {NavLink} from 'react-router-dom';
import {Rating} from '@mui/material';
import {rewriteDate} from '../../../features/rewriteDate';
import {UserResponseType} from '../../../api/authApi';
import {deleteItemThunk} from '../../../store/reducers/showReviewReducer';
import {useAppDispatch} from '../../../store/store';
import {LangType} from '../../../store/reducers/appReducer';

export const ReviewCover: React.FC<ReviewCoverPropsType> = (
    {
        src,
        id,
        name,
        product,
        rating,
        authorRating,
        hashtags,
        hashtagSearch,
        category,
        created,
        authorID,
        user,
        language
    }
) => {

    const dispatch = useAppDispatch();
    const link = useRef<HTMLAnchorElement>(null);
    const hashtagClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        hashtagSearch(e.currentTarget.title);
    }

    const deleteItem = () => {
        dispatch(deleteItemThunk({id, authorID}));
    }
    const getToEditMode = () => {
        link.current && link.current.click();
    }
    return (
        <Figure className={style.item}>
            <NavLink to={`/reviews/${id}`}>
                <Figure.Image
                    className={style.image}
                    alt={name}
                    src={src}
                />
            </NavLink>
            {
                user && user.id === authorID &&
                <div className={style.btnBlock}>
                    <Button className={style.btn} variant="outline-success" onClick={getToEditMode}>
                        {language === 'RU' ? 'Изменить' : 'Edit'}
                    </Button>
                    <Button className={style.btn} variant="outline-danger" onClick={deleteItem}>
                        {language === 'RU' ? 'Удалить' : 'Delete'}
                    </Button>
                </div>
            }
            {
                user && user.id !== authorID && user.role === 'ADMIN' &&
                <div className={style.btnBlock}>
                    <Button className={style.btn} variant="outline-success" onClick={getToEditMode}>
                        {language === 'RU' ? 'Изменить' : 'Edit'}
                    </Button>
                    <Button className={style.btn} variant="outline-danger" onClick={deleteItem}>
                        {language === 'RU' ? 'Удалить' : 'Delete'}
                    </Button>
                </div>
            }
            <div className={style.info}>
                <div className={style.general}>
                    <h3 className={style.name}>
                        <NavLink to={`/reviews/${id}`} className={style.link}>{name}</NavLink>
                    </h3>

                    <div className={style.rating}>
                        <Rating max={1} readOnly={true} value={1}/>
                        <span className={style.text}>
                            {
                                language === 'RU'
                                    ? `ОЦЕНКА: ${rating} / ОЦЕНКА АВТОРА: ${authorRating}`
                                    : `RATING: ${rating} / AUTHOR RATING: ${authorRating}`
                            }
                        </span>
                    </div>
                    <div className={style.product}>
                        {
                            language === 'RU'
                                ? `ПРОДУКТ: ${product}`
                                : `PRODUCT: ${product}`
                        }
                    </div>

                    <div className={style.category}>
                        {
                            language === 'RU'
                                ? `КАТЕГОРИЯ: ${category}`
                                : `category: ${category}`
                        }

                    </div>
                    <div className={style.hashtags}>
                        {
                            hashtags.map((h, i) =>
                                <a
                                    onClick={hashtagClickHandler}
                                    className={style.hashtag}
                                    key={i}
                                    title={h}
                                    href={h}
                                >{h} </a>)
                        }
                    </div>
                </div>
                {
                    created && <div className={style.created}>
                        {language === 'RU' ? 'ОПУБЛИКОВАНО' : 'CREATED'}: {rewriteDate(created)}</div>
                }
            </div>
            <NavLink to={`/reviews/edit/${id}`} ref={link}/>
        </Figure>
    );
}
type ReviewCoverPropsType = {
    src: string
    id: string
    rating: number
    authorRating: number
    authorID: string
    name: string
    product: string
    hashtags: string[]
    hashtagSearch: (hashtag: string) => void
    category: string
    created: Date
    language: LangType

    user: UserResponseType
}
