import React, {useEffect, useRef} from 'react';
import {Header} from '../c1-header/Header';
import {Container} from 'react-bootstrap';
import style from './App.module.scss';
import {AppRouter} from '../с9-additions/AppRouter';
import {Loader} from '../с9-additions/loader/Loader';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {AppStatusType} from '../../store/reducers/appReducer';
import {SearchPanel} from '../c2-main/m7-search/SearchPanel';
import {SearchType} from '../../api/reviewApi';
import {getReviewsThunk} from '../../store/reducers/reviewsReducer';
import {NavLink} from 'react-router-dom';
import {getRedirectResultThunk} from '../../store/reducers/authReducer';


export const App: React.FC = () => {
    const status = useSelector<RootState, AppStatusType>(state => state.appReducer.status);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const dispatch = useAppDispatch();
    const link = useRef<HTMLAnchorElement>(null);
    const changeSearchValue = (search: SearchType) => {
        if (link.current) {
            dispatch(getReviewsThunk({currentPage: 1, search}));
            link.current.click();
        }
    }
    useEffect(() => {
        dispatch(getRedirectResultThunk());
    }, [])
    return (
        <div className={isDarkTheme ? style.app : `${style.app} ${style.light}`}>
            <Header/>
            {status === 'loading' && <Loader/>}
            {status === 'stop' && <Container className={style.container}>
                <SearchPanel callBack={changeSearchValue}/>
                <AppRouter/>
            </Container>
            }
            <NavLink to={`/reviews`} ref={link}/>
        </div>
    )
}
