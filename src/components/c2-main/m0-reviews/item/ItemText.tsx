import MDEditor, {ContextStore} from '@uiw/react-md-editor';
import React, {ChangeEvent, useEffect, useState} from 'react';
import style from '../Reviews.module.scss';
import {Button} from 'react-bootstrap';
import {CheckLg, Pencil} from 'react-bootstrap-icons';

export const ItemText: React.FC<ItemTextPropsType> = ({text, callback}) => {
    const [value, setValue] = useState(text);
    const [isEdit, setIsEdit] = useState(false);
    const onChangeValue = (value?: string | undefined, event?: ChangeEvent<HTMLTextAreaElement> | undefined, state?: ContextStore | undefined) => {
        setValue(value as string);
    }
    const onChangeEditMode = () => {
        setIsEdit(true);
    }

    useEffect(() => {
        setValue(text);
    }, [text])

    const onSaveDescription = () => {
        if (value) {
            callback(value);
        } else {
            setValue(text);
        }
        setIsEdit(false);
    }
    return (
        <div className={style.markdown}>
            <div className={style.buttonsBlock}>
                <Button className={style.editBtn} variant="outline-success" title="Edit" onClick={onChangeEditMode}>
                    <Pencil/>
                </Button>
                {isEdit &&
                    <Button className={style.editBtn} variant="outline-primary" title="Save"
                            onClick={onSaveDescription}>
                        <CheckLg/>
                    </Button>
                }
            </div>
            {isEdit && <MDEditor
                className={style.editor}
                value={value}
                onChange={onChangeValue}
            />}
            {!isEdit && <MDEditor.Markdown className={style.text} source={text}/>}
        </div>
    )
}

type ItemTextPropsType = {
    text: string
    callback: (value: string) => void
}