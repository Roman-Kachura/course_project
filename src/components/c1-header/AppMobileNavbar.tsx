import React, {ChangeEvent, MouseEvent, useState} from 'react';
import style from './Header.module.scss';
import {Accordion, Button, CloseButton, Container, Form, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap';
import {UserResponseType} from '../../api/authApi';
import {LangType} from '../../store/reducers/appReducer';
import {NavLink} from 'react-router-dom';
import {useT} from '../../i18n';

export const AppMobileNavbar: React.FC<AppMobileNavbarPropsType> = (
    {
        isDarkTheme,
        logout,
        user,
        changeTheme,
        isAuth,
        language,
        changeLanguage
    }
) => {
    const t = useT();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Navbar fixed={'top'} bg={isDarkTheme ? 'dark' : 'light'} variant={isDarkTheme ? 'dark' : 'light'}
                className={isDarkTheme ? style.header : `${style.header} ${style.light}`}>
            <Container className={style.container}>
                <div/>
                <Button variant={'outline-secondary'} onClick={handleShow}>
                    {t('MENU')}
                </Button>
            </Container>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header className={isDarkTheme ? style.canvasHeader : `${style.canvasHeader} ${style.light}`}>
                    {
                        isDarkTheme
                            ? <CloseButton variant="white" onClick={handleClose}/>
                            : <CloseButton onClick={handleClose}/>
                    }

                </Offcanvas.Header>
                <Offcanvas.Body className={isDarkTheme ? style.canvasBody : `${style.canvasBody} ${style.light}`}>
                    {user &&
                        <div className={style.profile}>
                            <div className={style.image}>
                                <img
                                    src={user.photo}/>
                            </div>
                            <NavLink to={`/users/${user.id}`} className={style.name}>{user.name}</NavLink>
                        </div>
                    }
                    <Form.Check
                        onChange={changeTheme}
                        type="switch"
                        label={t('THEME')}
                        className={style.theme}
                        checked={isDarkTheme}
                    />
                    <Form.Select className={style.lang} value={language} onChange={changeLanguage}>
                        <option value="ru">RU</option>
                        <option value="en">EN</option>
                    </Form.Select>
                    {
                        isAuth
                            ? <Accordion className={style.accordion}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>{t('REVIEWS')}</Accordion.Header>
                                    <Accordion.Body>
                                        <NavLink className={style.reviewsLink} to="/create-review">
                                            {t('CREATE_REVIEW')}
                                        </NavLink>
                                        <NavLink className={style.reviewsLink} to="/my-reviews">
                                            {t('MY_REVIEWS')}
                                        </NavLink>
                                        <NavLink className={style.reviewsLink} to="/reviews">
                                            {t('ALL_REVIEWS')}
                                        </NavLink>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>{t('CATEGORIES')}</Accordion.Header>
                                    <Accordion.Body>
                                        {user.role === 'ADMIN' &&
                                            <NavLink className={style.optionsLink} to="/categories">
                                                {t('CATEGORIES')}
                                            </NavLink>
                                        }
                                        {user.role === 'ADMIN' &&
                                            <NavLink className={style.optionsLink} to="/users">
                                                {t('USERS')}
                                            </NavLink>
                                        }
                                        <NavLink className={style.optionsLink} to="/setting">
                                            {t('SETTING')}
                                        </NavLink>
                                        <NavDropdown.Item className={`${style.optionsLink} ${style.logout}`}
                                                          onClick={logout}
                                                          href="">
                                            {t('LOGOUT')}
                                        </NavDropdown.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            : <div>
                                <NavLink className={style.reviewsLink} to="/reviews">{t('REVIEWS')}</NavLink>
                                <NavLink to="/login" className={style.loginLink}>
                                    {t('LOGIN')}
                                </NavLink>
                            </div>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </Navbar>
    )
}

type AppMobileNavbarPropsType = {
    isDarkTheme: boolean
    user: UserResponseType
    isAuth: boolean
    language: LangType
    changeTheme: (e: ChangeEvent<HTMLInputElement>) => void
    logout: (e: MouseEvent<HTMLElement>) => void
    changeLanguage: (e: ChangeEvent<HTMLSelectElement>) => void
}