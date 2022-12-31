import React, {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../store/store';
import style from './Categories.module.scss';
import {Button, Form, Table} from 'react-bootstrap';
import {createCategoryThunk, getCategoriesThunk} from '../../../store/reducers/categoriesReducer';

export const Categories: React.FC = () => {
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
            setError('Category name can contain characters from A to Z')
        }
    }

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch])
    return (
        <div className={style.categories}>
            <Table className={style.table} striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>CATEGORIES</th>
                </tr>
                </thead>
                <tbody>
                {categories.length > 0 && categories.map((c, i) => <tr key={c + i}>
                    <td>{c}</td>
                </tr>)}
                </tbody>
            </Table>
            <div className={style.addBlock}>
                <Form.Control type="text" className={!error ? `${style.input}` : `${style.input} ${style.error}`}
                              value={value} onChange={changeValue}/>
                {error && <div className={style.errorText}>{error}</div>}
                <Button onClick={onClickHandler}>Add category</Button>
            </div>
        </div>
    )
}