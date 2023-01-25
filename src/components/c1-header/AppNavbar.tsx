import React, {ChangeEvent, MouseEvent} from 'react';
import style from './Header.module.scss';
import {NavLink} from 'react-router-dom';
import {UserResponseType} from '../../api/authApi';
import {Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {LangType} from '../../store/reducers/appReducer';
import {useT} from '../../i18n';

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
    const t = useT();
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
                                    ? <NavDropdown title={t('REVIEWS')} className={style.dropdown}>
                                        <NavLink className={style.dropdownItem} to="/create-review">
                                            {t('CREATE_REVIEW')}
                                        </NavLink>
                                        <NavLink className={style.dropdownItem} to="/my-reviews">
                                            {t('MY_REVIEWS')}
                                        </NavLink>
                                        <NavLink className={style.dropdownItem} to="/reviews">
                                            {t('ALL_REVIEWS')}
                                        </NavLink>
                                    </NavDropdown>
                                    : <NavLink to={'/reviews'} className={style.headerLink}>
                                        {t('REVIEWS')}
                                    </NavLink>
                            }
                        </Navbar.Collapse>
                        <Form.Check
                            onChange={changeTheme}
                            type="switch"
                            label={t('THEME')}
                            className={style.theme}
                            checked={isDarkTheme}
                        />
                    </div>
                    <Navbar className={style.navbar}>
                        <Form.Select className={style.lang} value={language} onChange={changeLanguage}>
                            <option value="ru">RU</option>
                            <option value="en">EN</option>
                        </Form.Select>
                        {user
                            ? <Navbar.Collapse className={style.collapse}>
                                <Nav className={style.nav}>
                                    <NavDropdown title={t('OPTION')}
                                                 className={style.dropdown}>
                                        {user.role === 'ADMIN' &&
                                            <NavLink className={style.dropdownItem} to="/categories">
                                                {t('CATEGORIES')}
                                            </NavLink>
                                        }
                                        {user.role === 'ADMIN' &&
                                            <NavLink className={style.dropdownItem} to="/users">
                                                {t('USERS')}
                                            </NavLink>
                                        }
                                        <NavLink className={style.dropdownItem} to="/setting">
                                            {t('SETTING')}
                                        </NavLink>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item className={`${style.dropdownItem} ${style.logout}`}
                                                          onClick={logout}>
                                            {t('LOGOUT')}
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                            : <NavLink to="/login" className={style.loginLink}>
                                {t('LOGIN')}
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