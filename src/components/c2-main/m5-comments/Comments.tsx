import React from 'react';
import {CommentType} from '../../../api/commentsApi';
import style from './Comments.module.scss';
import {Comment} from './Comment';

export const Comments = React.memo(({comments}: CommentsPropsType) => {
    return (
        <div className={style.comments}>
            {comments.map(c => <Comment key={c.id} {...c}/>)}
        </div>
    )
});

type CommentsPropsType = {
    comments: CommentType[]
}