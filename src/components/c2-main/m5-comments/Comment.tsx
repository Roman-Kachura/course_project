import React from 'react';
import {CommentType} from '../../../api/commentsApi';
import style from './Comments.module.scss';
import {rewriteDate} from '../../../features/rewriteDate';
import {useAppDispatch} from '../../../store/store';
import {Button} from 'react-bootstrap';
import {deleteCommentThunk} from '../../../store/reducers/commentsReducer';

export const Comment: React.FC<CommentType & { userID?: string }> = (
    {id, text, created, authorID, reviewID, userID, author}
) => {
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(deleteCommentThunk({id, authorID}));
    }
    return (
        <div className={style.item}>
            <div className={style.image}>
                <img src={author.photo} alt={author.name} title={author.name}/>
            </div>
            <div className={style.info}>
                <h4 className={style.name}>{author.name}</h4>
                <div className={style.text}>{text}</div>
                <div className={style.data}>{rewriteDate(created as Date)}</div>
            </div>
            {userID === authorID &&
                <Button className={style.btn} variant="outline-danger" onClick={onClickHandler}>Delete</Button>}
        </div>
    )
}
