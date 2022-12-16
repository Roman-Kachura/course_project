import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../store/store';
import {getUsersThunk, UserInitialStateType} from '../../../store/reducers/usersReducer';
import {useSelector} from 'react-redux';
import {UserResponseType} from '../../../api/authApi';
import {Pagination, Table} from 'react-bootstrap';
import style from './Users.module.scss';
import {NavLink} from 'react-router-dom';
import {AppPagination} from '../../с9-additions/AppPagination';

export const Users: React.FC = () => {
    const dispatch = useAppDispatch();
    const {data, currentPage, pagesCount} = useSelector<RootState, UserInitialStateType>(state => state.users);
    const getUsers = (currentPage: number = 1) => {
        dispatch(getUsersThunk({currentPage}));
    }

    useEffect(() => {
        getUsers();
    }, [])
    return (
        <div className={style.users}>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Collections</th>
                </tr>
                </thead>
                <tbody>
                {data.map((u, i) =>
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td><NavLink to="/">show</NavLink></td>
                    </tr>
                )}
                </tbody>
            </Table>
            <AppPagination pagesCount={pagesCount} currentPage={currentPage} callBack={getUsers}/>
        </div>
    )
}