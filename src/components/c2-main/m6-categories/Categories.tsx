import React, {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../store/store';
import style from './Categories.module.scss';
import {Button, Form, Table} from 'react-bootstrap';
import {createCategoryThunk, getCategoriesThunk} from '../../../store/reducers/categoriesReducer';
import {Navigate} from 'react-router-dom';
import {useT} from '../../../i18n';

export const Categories: React.FC = () => {
    const t = useT();
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const categories = useSelector<RootState, string[]>(state => state.categoriesReducer.categories);
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setValue(e.currentTarget.value.trim());
    }

    const onClickHandler = () => {
        if ((/^[a-zA-Z]+$/gi).test(value)) {
            dispatch(createCategoryThunk({category: value}));
        } else {
            setError(t('CATEGORY_ERROR'))
        }
    }

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);
    if (!isAuth) return <Navigate to={'/reviews'}/>
    return (
        <div className={isDarkTheme ? style.categories : `${style.categories} ${style.light}`}>
            <Table className={style.table} striped bordered hover variant={isDarkTheme ? 'dark' : 'light'}>
                <thead>
                <tr>
                    <th>
                        {t('ALL_CATEGORIES')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {categories.length > 0 && categories.map((c, i) => <tr key={c + i}>
                    <td>{c}</td>
                </tr>)}
                </tbody>
            </Table>
            <div className={style.addBlock}>
                <Form.Control
                    placeholder={t('NEW_CATEGORY')}
                    type="text" className={!error ? `${style.input}` : `${style.input} ${style.error}`}
                    value={value} onChange={changeValue}
                />
                {error && <div className={style.errorText}>{error}</div>}
                <Button onClick={onClickHandler}>
                    {t('ADD_CATEGORY')}
                </Button>
            </div>
        </div>
    )
}