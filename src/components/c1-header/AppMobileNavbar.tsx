import React, {ChangeEvent, MouseEvent, useState} from 'react';
import style from './Header.module.scss';
import {
    Accordion,
    Button,
    CloseButton,
    Container,
    Form,
    Navbar,
    NavDropdown,
    NavLink,
    Offcanvas
} from 'react-bootstrap';
import {UserResponseType} from '../../api/authApi';
import {LangType} from '../../store/reducers/appReducer';

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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Navbar fixed={'top'} bg={isDarkTheme ? 'dark' : 'light'} variant={isDarkTheme ? 'dark' : 'light'}
                className={isDarkTheme ? style.header : `${style.header} ${style.light}`}>
            <Container className={style.container}>
                <div/>
                <Button variant={'outline-secondary'} onClick={handleShow}>
                    {language === 'RU' ? 'МЕНЮ' : 'MENU'}
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
                            <NavLink href={`/users/${user.id}`} className={style.name}>{user.name}</NavLink>
                        </div>
                    }
                    <Form.Check
                        onChange={changeTheme}
                        type="switch"
                        label={language === 'RU' ? 'ТЕМНАЯ ТЕМА' : 'DARK THEME'}
                        className={style.theme}
                        checked={isDarkTheme}
                    />
                    <Form.Select className={style.lang} value={language} onChange={changeLanguage}>
                        <option value="RU">RU</option>
                        <option value="EN">EN</option>
                    </Form.Select>
                    {
                        isAuth
                            ? <Accordion className={style.accordion}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>{language === 'RU' ? 'ОБЗОРЫ' : 'REVIEWS'}</Accordion.Header>
                                    <Accordion.Body>
                                        <NavLink className={style.reviewsLink} href="/create-review">
                                            {language === 'RU' ? 'Создать обзор' : 'Create review'}
                                        </NavLink>
                                        <NavLink className={style.reviewsLink} href="/my-reviews">
                                            {language === 'RU' ? 'Мои обзоры' : 'My reviews'}
                                        </NavLink>
                                        <NavLink className={style.reviewsLink} href="/reviews">
                                            {language === 'RU' ? 'Все обзоры' : 'All Reviews'}
                                        </NavLink>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>{language === 'RU' ? 'ОПЦИИ' : 'OPTION'}</Accordion.Header>
                                    <Accordion.Body>
                                        {user.role === 'ADMIN' &&
                                            <NavLink className={style.optionsLink} href="/categories">
                                                {language === 'RU' ? 'Категории' : 'Categories'}
                                            </NavLink>
                                        }
                                        {user.role === 'ADMIN' &&
                                            <NavLink className={style.optionsLink} href="/users">
                                                {language === 'RU' ? 'Пользователи' : 'Users'}
                                            </NavLink>
                                        }
                                        <NavLink className={style.optionsLink} href="/setting">
                                            {language === 'RU' ? 'Настройки' : 'Setting'}
                                        </NavLink>
                                        <NavDropdown.Item className={`${style.optionsLink} ${style.logout}`}
                                                          onClick={logout}
                                                          href="">
                                            {language === 'RU' ? 'Выйти' : 'Logout'}
                                        </NavDropdown.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            : <div>
                                <NavLink className={style.reviewsLink} href="reviews">{language === 'RU' ? 'Обзоры' : 'Reviews'}</NavLink>
                                <NavLink href="/login" className={style.loginLink}>
                                    {language === 'RU' ? 'Войти' : 'Login'}
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