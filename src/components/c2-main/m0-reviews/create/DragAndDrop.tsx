import React, {useEffect, useState, DragEvent, useRef, ChangeEvent, RefObject, MouseEvent} from 'react';
import style from './Create.module.scss';
import {useT} from '../../../../i18n';
import {Form} from 'react-bootstrap';

export const DragAndDrop: React.FC<DragAndDropPropsType> = (
    {error, onChangeFileErrorCallBack, onChangeFilesCallBack, files}
) => {
    const t = useT();
    const [drag, setDrag] = useState(false);
    const fileRef: RefObject<HTMLInputElement> | null | undefined = useRef(null);
    const [images, setImage] = useState<string[] | null>(null);

    const fileHandler = (data: null | FileList) => {
        const newFiles = [];
        if (data && data[0]) {
            for (let file in data) {
                const elem = data[file];
                if (typeof elem === 'object') {
                    const fileType = data[file].type;
                    console.log(elem)
                    if (fileType.slice(0, 5) === 'image' || fileType === 'application/pdf') {
                        newFiles.push(data[file])
                    }
                }
            }
        }
        onChangeFilesCallBack([...files, ...newFiles]);
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
        const data = e.dataTransfer.files;
        fileHandler(data);
        onChangeImages();
        setDrag(false);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        fileHandler(files);
        onChangeImages();
    }

    const onClickFileHandler = () => onChangeFileErrorCallBack(false);

    const pickFile = () => fileRef.current && fileRef.current.click();

    const removeImageItem = (e: MouseEvent<HTMLButtonElement>, n: number) => {
        onChangeFilesCallBack(files.filter((f, i) => i !== n));
        e.stopPropagation();
    };

    const onChangeImages: any = () => {
        if (files.length > 0) {
            const imagesSrc: string[] = [];
            files.forEach(f => {
                const reader = new FileReader();
                reader.readAsDataURL(f);
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        imagesSrc.push(reader.result);
                        setImage(imagesSrc);
                    }
                }
            });
        } else {
            setImage([])
        }
    }

    useEffect(() => {
        onChangeImages();
    }, [files]);

    const imgElements = images !== null && images.length !== 0 && images.map(
        (image, index) =>
            <div key={`image${index}`} className={style.dragItem}>
                <img src={image} alt=""/>
                <button onClick={(e) => removeImageItem(e, index)}>&#215;</button>
            </div>
    )

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
                            !images?.length
                                ? `${t('SELECT_FILE')}`
                                : imgElements
                        }
                    </div>
            }
            <Form.Control
                className={style.file}
                type="file"
                onChange={onChangeHandler}
                onClick={onClickFileHandler}
                accept="image/*"
                multiple
                ref={fileRef}
            />
        </>
    )
}

type DragAndDropPropsType = {
    error: boolean
    onChangeFilesCallBack: (files: File[]) => void
    onChangeFileErrorCallBack: (error: boolean) => void
    files: File[]
}