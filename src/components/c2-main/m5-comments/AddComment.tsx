import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import style from './Comments.module.scss';
import {RootState, useAppDispatch} from '../../../store/store';
import {createCommentThunk} from '../../../store/reducers/commentsReducer';
import {useSelector} from 'react-redux';
import {LangType} from '../../../store/reducers/appReducer';

export const AddComment: React.FC<AddCommentPropsType> = ({authorID, reviewID}) => {
    const language = useSelector<RootState, LangType>(state => state.appReducer.language);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const l = value.length;
    const changeValue = (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.currentTarget.value);
    const addComment = () => {
        if (l > 0 && l < 1001) {
            dispatch(createCommentThunk({reviewID, authorID, text: value}));
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
                placeholder={language === 'RU' ? 'Ваш комментарий...' : 'Your comment...'}
                value={value}
                onChange={changeValue}
                onKeyDown={onKeyPressHandler}
            />
            <div
                className={value.length > 1000 ? `${style.count} ${style.error}` : `${style.count}`}>
                {value.length}/1000
            </div>
            <Button onClick={addComment}>
                {language === 'RU' ? 'ОТПРАВИТЬ' : 'SEND'}
            </Button>
        </div>

    )
}

type AddCommentPropsType = {
    authorID: string
    reviewID: string
};