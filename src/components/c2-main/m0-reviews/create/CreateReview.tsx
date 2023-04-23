import React, {ChangeEvent, RefObject, useEffect, useRef, useState} from 'react';
import style from './Create.module.scss';
import {RootState, useAppDispatch} from '../../../../store/store';
import {createReviewThunk} from '../../../../store/reducers/reviewsReducer';
import {Figure, Form} from 'react-bootstrap';
import {CreateReviewForm, CreateReviewValuesType} from './CreateReviewForm';
import {useSelector} from 'react-redux';
import {UserResponseType} from '../../../../api/authApi';
import {Navigate} from 'react-router-dom';
import {setIsResetThunk} from '../../../../store/reducers/showReviewReducer';
import {Rating} from '@mui/material';
import {useT} from '../../../../i18n';
import {DragAndDrop} from './DragAndDrop';
import {DnD} from './DnD';

export const CreateReview = React.memo(() => {
    const t = useT();
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const [file, setFile] = useState<File>();
    const [files, setFiles] = useState<File[]>([]);
    const [image, setImage] = useState<string | ArrayBuffer | null>();
    const [fileError, setFileError] = useState(false);
    const isReset = useSelector<RootState, boolean>(state => state.showReviewReducer.isReset);
    const dispatch = useAppDispatch();
    const [rating, setRating] = useState(0);

    useEffect(() => {
        dispatch(setIsResetThunk());
    }, []);

    const onChangeFiles = (files: File[]) => setFiles(files);
    const onChangeFileError = (error: boolean) => setFileError(error);
    // const changeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    //     const reader = new FileReader();
    //     const file = e.currentTarget.files && e.currentTarget.files[0];
    //     if (file) {
    //         setFile(file)
    //         reader.readAsDataURL(file);
    //         reader.onloadend = () => {
    //             if (typeof reader.result === 'string') {
    //                 setImage(reader.result);
    //             }
    //         }
    //     }
    // }
    //
    // const clickFileHandler = () => {
    //     setFileError(false);
    // }

    // const pickFile = () => {
    //     fileRef.current && fileRef.current.click()
    // }

    const addReview = (values: CreateReviewValuesType) => {
        if (!file) {
            setFileError(true);
            return {isReset: false};
        } else {
            const form = new FormData();
            const {name, hashtags, description, category, product} = values;
            form.append('file', file);
            form.append('name', name);
            form.append('product', product);
            form.append('hashtags', hashtags);
            form.append('description', description);
            form.append('category', category);
            form.append('rating', rating ? rating + '' : '5');
            form.append('authorID', user.id);
            dispatch(createReviewThunk({form}));
            setImage(null);
            return {isReset: true};

        }
    }

    if (!isAuth) return <Navigate to={'/'}/>
    if (isReset) return <Navigate to={'/reviews'}/>
    return (
        <div className={style.createReview}>
            <div className={style.drop}>
                {/*{*/}
                {/*    !image*/}
                {/*        ? <div className={!fileError ? style.drag : `${style.drag} ${style.error}`} onClick={pickFile}>*/}
                {/*            {t('SELECT_FILE')}*/}
                {/*        </div>*/}
                {/*        : <Figure.Image*/}
                {/*            className={style.image}*/}
                {/*            onClick={pickFile}*/}
                {/*            alt={''}*/}
                {/*            src={image as string}*/}
                {/*        />*/}
                {/*}*/}
                {/*<Form.Control*/}
                {/*    className={style.file}*/}
                {/*    type="file" onChange={changeFile}*/}
                {/*    onClick={clickFileHandler}*/}
                {/*    accept="image/*"*/}
                {/*    ref={fileRef}*/}
                {/*/>*/}
                {/*<DragAndDrop*/}
                {/*    error={fileError}*/}
                {/*    onChangeFileErrorCallBack={onChangeFileError}*/}
                {/*    onChangeFilesCallBack={onChangeFiles}*/}
                {/*    files={files}*/}
                {/*/>*/}
                <DnD error={fileError}/>
                <div className={style.rating}>
                    <div className={style.label}>{t('YOUR_RATING')}</div>
                    <Rating value={rating} max={10} onChange={(event, value) => value && setRating(value)}/>
                </div>
                {fileError && <div className={style.fileError}>{fileError}</div>}
            </div>
            <CreateReviewForm callBack={addReview}/>
        </div>
    )
});

