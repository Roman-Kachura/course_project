import React from 'react';
import {CommentType} from '../../../api/commentsApi';
import style from './Comments.module.scss';
import {Comment} from './Comment';
import {AppPagination} from '../../с9-additions/AppPagination';

export const Comments = React.memo(({comments, userID, page, count, callBack,pagesCount}: CommentsPropsType) => {
    return (
        <div className={style.comments}>
            {comments.map(c => <Comment key={c.id} {...c} userID={userID}/>)}
            {count > 0 && <div className={style.pagination}><AppPagination pagesCount={pagesCount} currentPage={page} callBack={callBack}/></div>}
        </div>
    )
});

type CommentsPropsType = {
    comments: CommentType[]
    userID?: string
    page: number
    count: number
    pagesCount: number
    callBack: (page: number) => void
}