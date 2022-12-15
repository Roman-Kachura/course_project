import React, {MouseEvent} from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import style from './Header.module.scss';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {UserResponseType} from '../../api/authApi';
import {logoutThunk} from '../../store/reducers/authReducer';
import Form from 'react-bootstrap/Form';
import {NavLink} from 'react-router-dom';

export const Header: React.FC = () => {
    const user = useSelector<RootState, UserResponseType>(state => state.auth.data.user);
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
                    <NavLink className={style.link} to="/content">Reviews</NavLink>
                </div>
                <Navbar className={style.navbar}>
                    <Form>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                        />
                    </Form>
                    {user
                        ? <Navbar.Collapse className={style.collapse}>
                            <Nav className={style.nav}>
                                <NavDropdown title="OPTIONS" className={style.dropdown}>
                                    {user.role === 'ADMIN' && <NavDropdown.Item className={style.dropdownItem}
                                                                                href="/users">Users</NavDropdown.Item>}
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