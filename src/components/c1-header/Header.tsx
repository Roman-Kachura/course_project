import React, {MouseEvent} from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import style from './Header.module.scss';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {UserResponseType} from '../../api/authApi';
import {logoutThunk} from '../../store/reducers/authReducer';
import {NavLink} from 'react-router-dom';

export const Header: React.FC = () => {
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const dispatch = useAppDispatch();
    const logout = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(logoutThunk({id: user.id}));
    }
    return (
        <Navbar bg="dark" variant="dark" className={style.header}>
            <Container className={style.container}>
                <div className={style.firstDiv}>
                    {user &&
                        <div className={style.profile}>
                            <div className={style.image}>
                                <img
                                    src={user.photo}/>
                            </div>
                            <h6 className={style.name}>{user.name}</h6>
                        </div>
                    }
                    <Navbar.Collapse className={style.collapse}>
                        <NavDropdown title="Reviews" className={style.dropdown}>
                            <NavDropdown.Item className={style.dropdownItem} href="/create-categories">Create
                                collection</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </div>
                <Navbar className={style.navbar}>
                    {user
                        ? <Navbar.Collapse className={style.collapse}>
                            <Nav className={style.nav}>
                                <NavDropdown title="Options" className={style.dropdown}>
                                    {user.role === 'ADMIN' &&
                                        <NavDropdown.Item className={style.dropdownItem} href="/create-category">Create
                                            category</NavDropdown.Item>
                                    }
                                    {user.role === 'ADMIN' &&
                                        <NavDropdown.Item className={style.dropdownItem}
                                                          href="/users">Users</NavDropdown.Item>
                                    }
                                    <NavDropdown.Item className={style.dropdownItem}
                                                      href="/setting">Setting</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item className={`${style.dropdownItem} ${style.logout}`}
                                                      onClick={logout}
                                                      href="">Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        : <NavLink to="/login" className={style.loginLink}>Login</NavLink>
                    }
                </Navbar>
            </Container>
        </Navbar>
    )
}