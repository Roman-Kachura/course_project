import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button, Form} from 'react-bootstrap';
import style from './Comments.module.scss';
import {useAppDispatch} from '../../../store/store';

export const AddComment: React.FC = () => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const l = value.length;
    const changeValue = (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.currentTarget.value);
    const addComment = () => {
        if (l > 0 && l < 3001) {
            alert(value);
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') addComment();
        if (e.key === 'Escape') setValue('');
    }
    return (
        <div className={style.addComment}>
            <Form.Control
                as="textarea"
                rows={3}
                className={style.textarea}
                placeholder="Your comment..."
                value={value}
                onChange={changeValue}
                onKeyDown={onKeyPressHandler}
            />
            <div
                className={value.length > 3000 ? `${style.count} ${style.error}` : `${style.count}`}>
                {value.length}/3000
            </div>
            <Button onClick={addComment}>SEND</Button>
        </div>

    )
}