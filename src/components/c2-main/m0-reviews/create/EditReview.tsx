import React, {ChangeEvent, RefObject, useEffect, useRef, useState} from 'react';
import style from './Create.module.scss';
import {RootState, useAppDispatch} from '../../../../store/store';
import {editReviewThunk} from '../../../../store/reducers/reviewsReducer';
import {Figure, Form} from 'react-bootstrap';
import {CreateReviewForm, CreateReviewValuesType} from './CreateReviewForm';
import {useSelector} from 'react-redux';
import {Navigate, useParams} from 'react-router-dom';
import {getReviewsItemThunk, setIsResetThunk} from '../../../../store/reducers/showReviewReducer';
import {Rating} from '@mui/material';
import {ReviewType} from '../../../../api/reviewApi';
import {Loader} from '../../../с9-additions/loader/Loader';
import {UserResponseType} from '../../../../api/authApi';
import {LangType} from '../../../../store/reducers/appReducer';

export const EditReview = () => {
    const id = useParams().id;
    const language = useSelector<RootState, LangType>(state => state.appReducer.language);
    const item = useSelector<RootState, ReviewType>(state => state.showReviewReducer.item);
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const [file, setFile] = useState<File>();
    const [image, setImage] = useState<string | ArrayBuffer | null>(item.image);
    const isReset = useSelector<RootState, boolean>(state => state.showReviewReducer.isReset);
    const dispatch = useAppDispatch();
    const fileRef: RefObject<HTMLInputElement> | null | undefined = useRef(null);
    const [rating, setRating] = useState(item.authorRating);
    let valuesForForm: CreateReviewValuesType = {} as CreateReviewValuesType;
    if (!!item) {
        valuesForForm = {
            name: item.name && item.name,
            product: item.product && item.product,
            category: item.category && item.category,
            description: item.text && item.text,
            hashtags: item.hashtags && item.hashtags.join(' ')
        }
    }

    useEffect(() => {
        dispatch(setIsResetThunk());
        id && dispatch(getReviewsItemThunk({id}));
    }, [id, dispatch]);

    useEffect(() => {
        setImage(item.image)
    }, [item.image]);
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

    const pickFile = () => {
        fileRef.current && fileRef.current.click()
    }

    const editReview = (values: CreateReviewValuesType) => {
        const form = new FormData();
        const {name, hashtags, description, category, product} = values;
        if (file) {
            form.append('file', file);
        }
        form.append('name', name);
        form.append('id', item.id);
        form.append('product', product);
        form.append('hashtags', hashtags);
        form.append('description', description);
        form.append('category', category);
        form.append('rating', `${rating}`);
        dispatch(editReviewThunk({form}));
        setImage(item.image);
        return {isReset: true};
    }
    if (!isAuth) return <Navigate to={'/'}/>
    if (isReset) return <Navigate to={'/reviews'}/>
    if (id === item.id) return (
        <div className={style.createReview}>
            <div className={style.drop}>
                <Figure.Image
                    className={style.image}
                    onClick={pickFile}
                    alt={''}
                    src={image as string}
                />
                <Form.Control
                    className={style.file}
                    type="file" onChange={changeFile}
                    accept="image/*"
                    ref={fileRef}
                />
                <div className={style.rating}>
                    <div className={style.label}>{language === 'RU' ? 'Ваша оценка' : 'Your rating:'}</div>
                    <Rating
                        value={rating}
                        max={10}
                        readOnly={user.role !== 'ADMIN' && user.id !== item.authorID}
                        onChange={(event, value) => value && setRating(value)}
                    />
                </div>
            </div>
            <CreateReviewForm callBack={editReview} values={valuesForForm}/>
        </div>
    )
    return <Loader/>
};

