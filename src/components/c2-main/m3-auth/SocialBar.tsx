import React from 'react';
import {useAppDispatch} from '../../../store/store';
import {authWithFacebookThunk, authWithGoogleThunk} from '../../../store/reducers/authReducer';
import {Facebook, Google} from 'react-bootstrap-icons';
import {Button} from 'react-bootstrap';
import style from './Auth.module.scss';

export const SocialBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const authWithGoogle = () => dispatch(authWithGoogleThunk());
    const authWithFacebook = () => dispatch(authWithFacebookThunk());
    return (
        <div className={style.social}>
            <Button className={style.socialBtn} variant='outline-danger' onClick={authWithGoogle}><Google/></Button>
            <Button className={style.socialBtn} variant='outline-primary' onClick={authWithFacebook}><Facebook/></Button>
        </div>
    )
}