import React, {useRef} from 'react';
import {Header} from '../c1-header/Header';
import {Container, NavLink} from 'react-bootstrap';
import style from './App.module.scss';
import {AppRouter} from '../с9-additions/AppRouter';
import {Loader} from '../с9-additions/loader/Loader';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {AppStatusType} from '../../store/reducers/appReducer';
import {SearchPanel} from '../c2-main/m7-search/SearchPanel';
import {SearchType} from '../../api/reviewApi';
import {getReviewsThunk} from '../../store/reducers/reviewsReducer';


export const App: React.FC = () => {
    const status = useSelector<RootState, AppStatusType>(state => state.appReducer.status);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const dispatch = useAppDispatch();
    const link = useRef<HTMLAnchorElement>(null);
    const changeSearchValue = (search: SearchType) => {
        if(link.current){
            dispatch(getReviewsThunk({currentPage: 1, search}));
            link.current.click();
        }
    }
    return (
        <div className={isDarkTheme ? style.app : `${style.app} ${style.light}`}>
            <Header/>
            {status === 'loading' && <Loader/>}
            {status === 'stop' && <Container className={style.container}>
                <SearchPanel callBack={changeSearchValue}/>
                <AppRouter/>
            </Container>
            }
            <NavLink href={`/reviews`} ref={link}/>
        </div>
    )
}
