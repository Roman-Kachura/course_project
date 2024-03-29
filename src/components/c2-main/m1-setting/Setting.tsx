import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import style from './Setting.module.scss';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../store/store';
import {UserResponseType} from '../../../api/authApi';
import {Navigate} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import {changeUserData} from '../../../store/reducers/usersReducer';
import {LangType} from '../../../store/reducers/appReducer';
import {useT} from '../../../i18n';

export const SettingContainer = React.memo(() => {
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    if (!isAuth) return <Navigate to={'/reviews'}/>
    return <Setting/>
})

const Setting = () => {
    const t = useT();
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const fileRef = useRef<any>(null);
    const {name, photo, id} = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const [value, setValue] = useState(name);
    const [error, setError] = useState('');
    const [file, setFile] = useState<File>();
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        fileRef.current.click();
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setValue(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') changeSetting();
    }
    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

    const changeSetting = () => {
        const newValue = value.trim();
        if (value.length < 3 || value.length > 20) {
            return setError(t('NAME_ERROR_LENGTH'));
        } else {
            if (!(/^[a-zA-Zа-яА-Я]+[\s]{0,1}[a-zA-Zа-яА-Я]+$/gi).test(newValue)) return setError(t('NAME_ERROR_CHARACTERS'));
            const form = new FormData();
            if (file) {
                form.append('file', file);
            }
            form.append('name', newValue);
            form.append('id', id);
            dispatch(changeUserData({form}));
        }

    }
    return (
        <div className={isDarkTheme ? style.setting : `${style.setting} ${style.light}`}>
            <div className={style.wrapper}>
                <div className={style.photo}>
                    <div className={style.image}>
                        <img src={image as string || photo} alt={name} onClick={onClickHandler}/>
                        <input
                            className={style.file}
                            type="file"
                            accept="image/*"
                            ref={fileRef}
                            onChange={onChangeFileHandler}
                        />
                    </div>
                    <div className={style.add} onClick={onClickHandler}>+</div>
                </div>
                <div className={style.text}>
                    <Form.Control
                        type="text"
                        placeholder={t('NEW_NAME')}
                        value={value}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyPressHandler}
                        className={!error ? `${style.input}` : `${style.input} ${style.error}`}
                    />
                    {error && <div className={style.error}>{error}</div>}
                    <Button className={style.btn} onClick={changeSetting}>
                        {t('CHANGE_TEXT')}
                    </Button>
                </div>
            </div>
        </div>
    )
}