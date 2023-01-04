import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import style from './Search.module.scss';
import {SearchType} from '../../../api/reviewApi';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../store/store';
import {getSearchListThunk, SearchListType, SearchParamsType} from '../../../store/reducers/searchReducer';

export const SearchPanel: React.FC<SearchPanelPropsType> = ({categories, sort, callBack}) => {
    const search = useSelector<RootState, SearchParamsType>(state => state.searchListReducer.params);
    const list = useSelector<RootState, SearchListType[]>(state => state.searchListReducer.list);
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState(search.category);
    const [sortValue, setSortValue] = useState(search.sort);
    const [searchValue, setSearchValue] = useState(search.value);
    const [showCollapse, setShowCollapse] = useState(false);
    const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
    }
    const changeSort = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortValue(e.currentTarget.value);
    }

    const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setShowCollapse(true);
        setSearchValue(e.currentTarget.value);
        dispatch(getSearchListThunk({value: e.currentTarget.value}));
    }
    useEffect(() => {
        setCategory(search.category);
        setSortValue(search.sort);
        setSearchValue(search.value);
    }, [search.category, search.value, search.sort])

    const onClickHandler = () => callBack({category, sort: sortValue, value: searchValue});
    const helpTextClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSearchValue(e.currentTarget.title);
        setShowCollapse(false);
    }
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
            <div className={style.inputBlock}>
                <Form.Control
                    className={style.input}
                    type="search"
                    placeholder="Search #hashtag, title"
                    value={searchValue}
                    onChange={changeSearchValue}
                />
                {list.length > 0 && showCollapse && <div className={style.collapse}>
                    {list.map(l => <button key={l.id} title={l.name} onClick={helpTextClick}>{l.name}</button>)}
                </div>}
            </div>
            <Button className={style.searchBtn} variant="primary" onClick={onClickHandler}>Search</Button>
        </Form>
    )
}

type SearchPanelPropsType = {
    categories: string[]
    sort: string[]
    callBack: (search: SearchType) => void
}