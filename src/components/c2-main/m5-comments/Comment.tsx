import React from 'react';
import {CommentType} from '../../../api/commentsApi';
import style from './Comments.module.scss';
import {rewriteDate} from '../../../features/rewriteDate';
import {RootState} from '../../../store/store';
import {Button} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {useT} from '../../../i18n';

export const Comment: React.FC<CommentType & { userID?: string, deleteCommentCallBack: (cid: string) => void }> = (
    {id, text, created, authorID, userID, author, deleteCommentCallBack}
) => {
    const t = useT();
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);

    const onClickHandler = () => deleteCommentCallBack(id);
    return (
        <div className={isDarkTheme ? style.item : `${style.item} ${style.light}`}>
            <div className={style.image}>
                <img src={author.photo} alt={author.name} title={author.name}/>
            </div>
            <div className={style.info}>
                <h4 className={style.name}>{author.name}</h4>
                <div className={style.text}>{text}</div>
                <div className={style.data}>{rewriteDate(created as Date)}</div>
            </div>
            {userID === authorID &&
                <Button className={style.btn} variant="outline-danger" onClick={onClickHandler}>
                    {t('DELETE_TEXT')}
                </Button>}
        </div>
    )
}
