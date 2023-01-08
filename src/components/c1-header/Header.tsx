import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {UserResponseType} from '../../api/authApi';
import {logoutThunk} from '../../store/reducers/authReducer';
import {LangType, setAppTheme, setLanguage} from '../../store/reducers/appReducer';
import {AppNavbar} from './AppNavbar';
import {AppMobileNavbar} from './AppMobileNavbar';

export const Header: React.FC = () => {
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const language = useSelector<RootState, LangType>(state => state.appReducer.language);
    const isAuth = useSelector<RootState, boolean>(state => state.authReducer.isAuth);
    const dispatch = useAppDispatch();
    const logout = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(logoutThunk({id: user.id}));
    }

    const changeTheme = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAppTheme(!isDarkTheme));
    }

    const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setLanguage(e.currentTarget.value));
    }

    const changeMenu = () => setIsMobileMenu(window.innerWidth < 992);
    useEffect(() => {
        if (window.innerWidth < 992) setIsMobileMenu(true);
        window.addEventListener('resize', changeMenu);
        return () => {
            window.removeEventListener('resize', changeMenu);
        }
    }, [window]);
    if (isMobileMenu)
        return <AppMobileNavbar
            changeLanguage={changeLanguage}
            user={user}
            language={language}
            isDarkTheme={isDarkTheme}
            logout={logout}
            changeTheme={changeTheme} isAuth={isAuth}
        />
    return (
        <AppNavbar
            changeLanguage={changeLanguage}
            user={user}
            language={language}
            isAuth={isAuth}
            logout={logout}
            changeTheme={changeTheme}
            isDarkTheme={isDarkTheme}
        />
    )
}