import React, {MouseEvent} from 'react';
import {Figure} from 'react-bootstrap';
import style from './Reviews.module.scss';
import {NavLink} from 'react-router-dom';

export const ReviewCover: React.FC<ReviewCoverPropsType> = ({src, id, title, rating, hashtags, hashtagSearch}) => {
    const onClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        hashtagSearch(e.currentTarget.title);
    }
    return (
        <Figure className={style.item}>
            <NavLink to={`/reviews/${id}`}>
                <Figure.Image
                    className={style.image}
                    alt={title}
                    src={src}
                />
            </NavLink>
            <Figure.Caption className={style.caption}>
                <NavLink to={`/reviews/${id}`} className={style.link}>
                    {title}
                </NavLink>
            </Figure.Caption>
            <div className={style.rating}>{rating}</div>
            <div>
                {
                    hashtags.map((h, i) =>
                        <a
                            onClick={onClickHandler}
                            className={style.hashtag}
                            key={i}
                            title={h}
                            href={h}
                        >{h} </a>)
                }
            </div>
        </Figure>
    );
}
type ReviewCoverPropsType = {
    src: string
    id: string
    rating: number
    title: string
    hashtags: string[]
    hashtagSearch: (hashtag: string) => void
}
