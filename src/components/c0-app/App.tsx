import React from 'react';
import {Header} from '../c1-header/Header';
import {Container} from 'react-bootstrap';
import style from './App.module.scss';
import {AppRouter} from '../с9-additions/AppRouter';


export const App: React.FC = () => {
    return (
        <div className={style.app}>
            <Header/>
            <Container className={style.container}>
                <AppRouter/>
            </Container>
        </div>
    )
}
