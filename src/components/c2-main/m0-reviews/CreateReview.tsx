import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './Reviews.module.scss';
import {RootState, useAppDispatch} from '../../../store/store';
import {getReviewsThunk, createReviewThunk} from '../../../store/reducers/reviewsReducer';
import {Figure, Form} from 'react-bootstrap';
import defaultImage from './default-image.png';
import {CreateReviewForm, CreateReviewValuesType} from './CreateReviewForm';
import {useSelector} from 'react-redux';
import {UserResponseType} from '../../../api/authApi';
import {Navigate} from 'react-router-dom';
import {setIsResetThunk} from '../../../store/reducers/showReviewReducer';

export const CreateReview = React.memo(() => {
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const [file, setFile] = useState<File>();
    const [image, setImage] = useState<string | ArrayBuffer | null>(defaultImage);
    const [fileError, setFileError] = useState('');
    const isReset = useSelector<RootState, boolean>(state => state.showReviewReducer.isReset);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setIsResetThunk());
    }, [])
    const changeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const file = e.currentTarget.files && e.currentTarget.files[0];
        if (file) {
            setFile(file)
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImage(reader.result);
                }
            }
        }
    }

    const clickFileHandler = () => {
        setFileError('');
    }

    const addReview = (values: CreateReviewValuesType) => {
        if (!file) {
            setFileError('Please, select image for your review!');
            return {isReset: false};
        } else {
            const form = new FormData();
            const {title, hashtags, description, category} = values;
            form.append('file', file);
            form.append('title', title);
            form.append('hashtags', hashtags);
            form.append('description', description);
            form.append('category', category);
            form.append('authorID', user.id);
            dispatch(createReviewThunk({form, values}));
            setImage(defaultImage);
            return {isReset: true};

        }
    }

    if (!isAuth) return <Navigate to={'/'}/>
    if (isReset) return <Navigate to={'/reviews'}/>
    return (
        <div className={style.createReview}>
            <div className={style.drop}>
                <Figure.Image
                    className={style.image}
                    alt={''}
                    src={image as string}
                />
                <Form.Control
                    className={style.file}
                    type="file" onChange={changeFile}
                    onClick={clickFileHandler}
                    accept="image/*"
                />
                {fileError && <div className={style.fileError}>{fileError}</div>}
            </div>
            <CreateReviewForm callBack={addReview}/>
        </div>
    )
});

