import React, {ChangeEvent, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import style from './SortPanel.module.scss';
import {Button, Form} from 'react-bootstrap';
import {LangType} from '../../../store/reducers/appReducer';

export const SortPanel: React.FC<SortPanelPropsType> = ({sort, callBack, search}) => {
    const language = useSelector<RootState, LangType>(state => state.appReducer.language);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const categories = useSelector<RootState, string[]>(state => state.categoriesReducer.categories);
    const [category, setCategory] = useState(search.category);
    const [sortValue, setSortValue] = useState(search.sort);
    const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
    }
    const changeSort = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortValue(e.currentTarget.value);
    }

    const onClickHandler = () => callBack(category, sortValue);
    return (
        <Form className={isDarkTheme ? style.sortPanel : `${style.sortPanel} ${style.light}`}>
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
            <Button className={style.sortBtn} variant="primary" onClick={onClickHandler}>
                OK
            </Button>
        </Form>
    )
}

type SortPanelPropsType = {
    search: {sort:string,category:string}
    sort: string[],
    callBack: (category: string, sort: string) => void
}