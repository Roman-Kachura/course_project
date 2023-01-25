import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../store/store';
import {getUsersThunk, UserInitialStateType} from '../../../store/reducers/usersReducer';
import {useSelector} from 'react-redux';
import {UserResponseType} from '../../../api/authApi';
import {Table} from 'react-bootstrap';
import style from './Users.module.scss';
import {Navigate, NavLink} from 'react-router-dom';
import {AppPagination} from '../../с9-additions/AppPagination';
import {setAppStatus} from '../../../store/reducers/appReducer';
import {useT} from '../../../i18n';


export const Users = React.memo(() => {
    const dispatch = useAppDispatch();
    const {users, currentPage, pagesCount} = useSelector<RootState, UserInitialStateType>(state => state.usersReducer);
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const getUsers = (currentPage: number = 1) => {
        dispatch(getUsersThunk({currentPage}));
    }
    useEffect(() => {
        dispatch(setAppStatus('stop'));
    }, [dispatch]);
    if (!user || user.role !== 'ADMIN') return <Navigate to="/"/>
    return <UsersComponent
        user={user}
        data={users}
        currentPage={currentPage}
        pagesCount={pagesCount}
        getUsers={getUsers}
    />
});
const UsersComponent: React.FC<UsersComponentType> = ({data, getUsers, pagesCount, currentPage, user}) => {
    const t = useT();
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    useEffect(() => {
        getUsers(currentPage);
    }, [currentPage]);

    return (
        <div className={style.users}>
            <Table striped bordered hover variant={isDarkTheme ? 'dark' : 'light'}>
                <thead>
                <tr>
                    <th>
                        {t('NAME_TEXT')}
                    </th>
                    <th>
                        {t('EMAIL_TEXT')}
                    </th>
                    <th>
                        {t('ROLE_TEXT')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.map((u, i) =>
                    <tr key={u.id}>
                        <td><NavLink to={`/users/${u.id}`}>{u.name}</NavLink></td>
                        <td>{u.email}</td>
                        <td>{u.role === 'ADMIN' ? t('ADMIN_ROLE_TEXT') : t('USER_ROLE_TEXT')}</td>
                    </tr>
                )}
                </tbody>
            </Table>
            {pagesCount > 1 && <AppPagination pagesCount={pagesCount} currentPage={currentPage} callBack={getUsers}/>}
        </div>
    )
}


type UsersComponentType = {
    getUsers: (currentPage: number) => void
    data: UserResponseType[]
    user: UserResponseType
    pagesCount: number
    currentPage: number
}