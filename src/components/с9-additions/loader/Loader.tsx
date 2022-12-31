import React from 'react';
import {Spinner} from 'react-bootstrap';
import style from './Loader.module.scss';

export const Loader: React.FC = () => {
    return (
        <div className={style.container}>
            <Spinner animation="grow" variant="primary"  className={style.spinner}/>
            <Spinner animation="grow" variant="secondary"  className={style.spinner}/>
            <Spinner animation="grow" variant="success"  className={style.spinner}/>
            <Spinner animation="grow" variant="danger"  className={style.spinner}/>
            <Spinner animation="grow" variant="warning"  className={style.spinner}/>
        </div>
    )
}