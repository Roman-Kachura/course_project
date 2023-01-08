import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import style from './Search.module.scss';
import {SearchType} from '../../../api/reviewApi';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../store/store';
import {getSearchListThunk, SearchListType, SearchParamsType} from '../../../store/reducers/searchReducer';
import {NavLink} from 'react-router-dom';
import {Loader} from '../../с9-additions/loader/Loader';
import {LangType} from '../../../store/reducers/appReducer';

export const SearchPanel: React.FC<SearchPanelPropsType> = ({callBack}) => {
    const language = useSelector<RootState, LangType>(state => state.appReducer.language);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const search = useSelector<RootState, SearchParamsType>(state => state.searchListReducer.params);
    const list = useSelector<RootState, SearchListType[]>(state => state.searchListReducer.list);
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState(search.category);
    const [sortValue, setSortValue] = useState(search.sort);
    const [searchValue, setSearchValue] = useState(search.value);
    const [showCollapse, setShowCollapse] = useState(false);
    const categories = useSelector<RootState, string[]>(state => state.categoriesReducer.categories);
    const sort = useSelector<RootState, string[]>(state => state.reviewsReducer.sort);
    const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
    }
    const changeSort = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortValue(e.currentTarget.value);
    }

    const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) {
            setShowCollapse(true);
            dispatch(getSearchListThunk({value: e.currentTarget.value}));
        } else {
            setShowCollapse(false);
        }
        setSearchValue(e.currentTarget.value);
    }
    useEffect(() => {
        setCategory(search.category);
        setSortValue(search.sort);
        setSearchValue(search.value);
    }, [search.category, search.value, search.sort]);

    const onClickHandler = () => {
        setShowCollapse(false);
        callBack({category, sort: sortValue, value: searchValue});
    }
    const helpTextClick = (e: MouseEvent<HTMLAnchorElement>) => {
        setSearchValue(e.currentTarget.title);
        setShowCollapse(false);
    }
    if (sort && categories) return (
        <Form className={isDarkTheme ? style.form : `${style.form} ${style.light}`}>
            <Form.Select value={category} className={style.select} onChange={changeCategory}>
                <option value="">
                    {language === 'RU' ? 'ВСЕ КАТЕГОРИИ' : 'ALL CATEGORIES'}
                </option>
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
                    placeholder={language === 'RU' ? '#хэштэг, заголовок' : '#hashtag, title'}
                    value={searchValue}
                    onChange={changeSearchValue}
                />
                {list.length > 0 && showCollapse && <div className={style.collapse}>
                    {list.map(
                        l => <NavLink
                            to={`/reviews/${l.id}`}
                            key={l.id} title={l.name}
                            onClick={helpTextClick}>
                            {l.name}
                            <small>{l.subject}</small>
                        </NavLink>
                    )}
                </div>}
            </div>
            <Button className={style.searchBtn} variant="primary" onClick={onClickHandler}>
                {language === 'RU' ? 'ИСКАТЬ' : 'SEARCH'}
            </Button>
        </Form>
    )
    return <Loader/>
}

type SearchPanelPropsType = {
    callBack: (search: SearchType) => void
}