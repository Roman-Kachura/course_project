import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import style from './Reviews.module.scss';
import {SearchType} from '../../../api/reviewApi';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

export const SearchPanel: React.FC<SearchPanelPropsType> = ({categories, sort, callBack}) => {
    const search = useSelector<RootState, SearchType>(state => state.reviewReducer.search);
    const [category, setCategory] = useState(search.category);
    const [sortValue, setSortValue] = useState(search.sort);
    const [searchValue, setSearchValue] = useState(search.value);
    const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
    }
    const changeSort = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortValue(e.currentTarget.value);
    }

    const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    }
    useEffect(()=>{
        setCategory(search.category);
        setSortValue(search.sort);
        setSearchValue(search.value);
    },[search.category,search.value,search.sort])

    const onClickHandler = () => callBack({category, sort: sortValue, value: searchValue});
    return (
        <Form className={style.form}>
            <Form.Select value={category} className={style.select} onChange={changeCategory}>
                <option value="">ALL CATEGORIES</option>
                {
                    categories.map((c, i) => <option key={i} value={c}>{c}</option>)
                }
            </Form.Select>
            <Form.Select className={style.select} value={sortValue} onChange={changeSort}>
                {
                    sort.map((s, i) => <option key={i} value={s}>{s}</option>)
                }
            </Form.Select>
            <Form.Control
                className={style.input}
                type="search"
                placeholder="Search"
                value={searchValue}
                onChange={changeSearchValue}
            />
            <Button className={style.searchBtn} variant="outline-success" onClick={onClickHandler}>Search</Button>
        </Form>
    )
}

type SearchPanelPropsType = {
    categories: string[]
    sort: string[]
    callBack: (search: SearchType) => void
}