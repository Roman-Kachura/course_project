import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import style from './Comments.module.scss';
import {RootState} from '../../../store/store';
import {useSelector} from 'react-redux';
import {useT} from '../../../i18n';

export const AddComment: React.FC<AddCommentPropsType> = ({authorID, reviewID, callBack}) => {
    const t = useT();
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const [value, setValue] = useState('');
    const l = value.length;
    const changeValue = (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.currentTarget.value);
    const addComment = () => {
        if (l > 0 && l < 1001) {
            callBack(value)
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') addComment();
        if (e.key === 'Escape') setValue('');
    }
    return (
        <div className={isDarkTheme ? style.addComment : `${style.addComment} ${style.light}`}>
            <Form.Control
                as="textarea"
                rows={3}
                className={style.textarea}
                placeholder={t('YOUR_COMMENT')}
                value={value}
                onChange={changeValue}
                onKeyDown={onKeyPressHandler}
            />
            <div
                className={value.length > 1000 ? `${style.count} ${style.error}` : `${style.count}`}>
                {value.length}/1000
            </div>
            <Button onClick={addComment}>
                {t('SEND_TEXT')}
            </Button>
        </div>

    )
}

type AddCommentPropsType = {
    authorID: string
    reviewID: string

    callBack: (text: string) => void
};