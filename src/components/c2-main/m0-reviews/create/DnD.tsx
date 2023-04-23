import React, {ChangeEvent, DragEvent, RefObject, useRef, useState} from 'react';
import style from './Create.module.scss';
import {Form} from 'react-bootstrap';
import {useT} from '../../../../i18n';

export const DnD: React.FC<DnDPropsType> = ({error}) => {
    const t = useT();
    const [drag, setDrag] = useState(false);
    const [image, setImage] = useState<string | ArrayBuffer | null>();
    const fileRef: RefObject<HTMLInputElement> | null | undefined = useRef(null);
    const fileHandler = (data: null | FileList) => {

    }

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.files && e.currentTarget.files[0])
    }

    const onClickFileHandler = () => {

    };
    const pickFile = () => fileRef.current && fileRef.current.click();
    return (
        <>
            {
                drag
                    ? <div
                        className={!error ? style.drag : `${style.drag} ${style.error}`}
                        onDragStart={(e) => dragStartHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                        onDrop={(e) => onDropHandler(e)}
                        onClick={pickFile}
                    >
                        {t('SELECT_FILE')}
                    </div>
                    : <div
                        className={!error ? style.drag : `${style.drag} ${style.error}`}
                        onDragStart={(e) => dragStartHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                        onClick={pickFile}
                    >
                        {
                            !image
                                ? `${t('SELECT_FILE')}`
                                : <img alt="" src={image as string}/>
                        }
                    </div>
            }
            <Form.Control
                className={style.file}
                type="file"
                onChange={onChangeHandler}
                onClick={onClickFileHandler}
                accept="image/*"
                ref={fileRef}
            />
        </>
    )
}

type DnDPropsType = {
    error: boolean
}