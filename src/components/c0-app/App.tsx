import React from 'react';
import {Header} from '../c1-header/Header';
import {Container} from 'react-bootstrap';
import style from './App.module.scss';
import {AppRouter} from '../с9-additions/AppRouter';
import {Loader} from '../с9-additions/loader/Loader';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {AppStatusType} from '../../store/reducers/appReducer';


export const App: React.FC = () => {
    const status = useSelector<RootState, AppStatusType>(state => state.appReducer.status);
    return (
        <div className={style.app}>
            <Header/>
            {status === 'loading' && <Loader/>}
            {status === 'stop' && <Container className={style.container}>
                <AppRouter/>
            </Container>
            }
        </div>
    )
}
