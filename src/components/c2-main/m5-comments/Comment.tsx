import React, {useEffect} from 'react';
import {AuthorType, CommentType} from '../../../api/commentsApi';
import style from './Comments.module.scss';
import {rewriteDate} from '../../../features/rewriteDate';
import {RootState, useAppDispatch} from '../../../store/store';
import {getAuthorForComment} from '../../../store/reducers/showReviewReducer';
import {useSelector} from 'react-redux';

export const Comment: React.FC<CommentType> = ({id, text, created, authorID, reviewID}) => {
    const dispatch = useAppDispatch();
    const author = useSelector<RootState, AuthorType>(state => state.showReviewReducer.author);
    useEffect(() => {
        if(authorID){
            dispatch(getAuthorForComment({id: authorID}));
        }
    }, [authorID]);
    return (
        <div className={style.item}>
            <div className={style.image}>
                <img src={author.photo} alt={author.name} title={author.name}/>
            </div>
            <div className={style.info}>
                <h4 className={style.name}>{author.name}</h4>
                <div className={style.text}>{text}</div>
                <div className={style.data}>{rewriteDate(created)}</div>
            </div>
        </div>
    )
}
