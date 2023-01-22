import React, {ChangeEvent, MouseEvent} from 'react';
import style from './Header.module.scss';
import {NavLink, useLocation} from 'react-router-dom';
import {UserResponseType} from '../../api/authApi';
import {Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {LangType} from '../../store/reducers/appReducer';

export const AppNavbar: React.FC<NavbarPropsType> = (
    {
        isDarkTheme,
        user,
        isAuth,
        changeTheme,
        logout,
        language,
        changeLanguage
    }
) => {
    const location = useLocation();
    console.log(location)
    return (
        <>
            <Navbar fixed={'top'} bg={isDarkTheme ? 'dark' : 'light'} variant={isDarkTheme ? 'dark' : 'light'}
                    className={isDarkTheme ? style.header : `${style.header} ${style.light}`}>
                <Container className={style.container}>
                    <div className={style.firstDiv}>
                        {user &&
                            <div className={style.profile}>
                                <div className={style.image}>
                                    <img src={user.photo}/>
                                </div>
                                <NavLink to={`/users/${user.id}`} className={style.name}>{user.name}</NavLink>
                            </div>
                        }
                        <Navbar.Collapse className={style.collapse}>
                            {
                                isAuth
                                    ? <NavDropdown title={language === 'RU' ? 'Обзоры' : 'Reviews'} className={style.dropdown}>
                                        <NavLink className={style.dropdownItem} to="/create-review">
                                            {language === 'RU' ? 'Создать обзор' : 'Create review'}
                                        </NavLink>
                                        <NavLink className={style.dropdownItem} to="/my-reviews">
                                            {language === 'RU' ? 'Мои обзоры' : 'My reviews'}
                                        </NavLink>
                                        <NavLink className={style.dropdownItem} to="/reviews">
                                            {language === 'RU' ? 'Все обзоры' : 'All Reviews'}
                                        </NavLink>
                                    </NavDropdown>
                                    : <NavLink to={'/reviews'} className={style.headerLink}>
                                        {language === 'RU' ? 'Обзоры' : 'Reviews'}
                                    </NavLink>
                            }
                        </Navbar.Collapse>
                        <Form.Check
                            onChange={changeTheme}
                            type="switch"
                            label={language === 'RU' ? 'ТЕМНАЯ ТЕМА' : 'DARK THEME'}
                            className={style.theme}
                            checked={isDarkTheme}
                        />
                    </div>
                    <Navbar className={style.navbar}>
                        <Form.Select className={style.lang} value={language} onChange={changeLanguage}>
                            <option value="RU">RU</option>
                            <option value="EN">EN</option>
                        </Form.Select>
                        {user
                            ? <Navbar.Collapse className={style.collapse}>
                                <Nav className={style.nav}>
                                    <NavDropdown title={language === 'RU' ? 'Опции' : 'Options'}
                                                 className={style.dropdown}>
                                        {user.role === 'ADMIN' &&
                                            <NavLink className={style.dropdownItem} to="/categories">
                                                {language === 'RU' ? 'Категории' : 'Categories'}
                                            </NavLink>
                                        }
                                        {user.role === 'ADMIN' &&
                                            <NavLink className={style.dropdownItem} to="/users">
                                                {language === 'RU' ? 'Пользователи' : 'Users'}
                                            </NavLink>
                                        }
                                        <NavLink className={style.dropdownItem} to="/setting">
                                            {language === 'RU' ? 'Настройки' : 'Setting'}
                                        </NavLink>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item className={`${style.dropdownItem} ${style.logout}`}
                                                          onClick={logout}>
                                            {language === 'RU' ? 'Выйти' : 'Logout'}
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                            : <NavLink to="/login" className={style.loginLink}>
                                {language === 'RU' ? 'Войти' : 'Login'}
                            </NavLink>
                        }
                    </Navbar>
                </Container>
            </Navbar>
        </>
    )
}

export type NavbarPropsType = {
    language: LangType
    changeLanguage: (e: ChangeEvent<HTMLSelectElement>) => void
    isDarkTheme: boolean
    user: UserResponseType
    isAuth: boolean
    changeTheme: (e: ChangeEvent<HTMLInputElement>) => void
    logout: (e: MouseEvent<HTMLElement>) => void
}