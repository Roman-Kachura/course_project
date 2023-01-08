import style from './Profile.module.scss';
import {Figure} from 'react-bootstrap';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../store/store';
import {UserResponseType} from '../../../api/authApi';
import {useParams} from 'react-router-dom';
import {Loader} from '../../с9-additions/loader/Loader';
import {getOneUserThunk, getRatedReviewsThunk} from '../../../store/reducers/profileReducer';
import {getReviewsThunk} from '../../../store/reducers/reviewsReducer';
import {UserReviewsTable} from './UserReviewsTable';
import {UserRatedReviewsTable} from './UserRatedReviewsTable';
import {LangType} from '../../../store/reducers/appReducer';

export const Profile = () => {
    const id = useParams().id;
    const dispatch = useAppDispatch();
    const user = useSelector<RootState, UserResponseType>(state => state.authReducer.data.user);
    const profile = useSelector<RootState, UserResponseType>(state => state.profileReducer.user);
    const isDarkTheme = useSelector<RootState, boolean>(state => state.appReducer.isDarkTheme);
    const language = useSelector<RootState, LangType>(state => state.appReducer.language);
    const getUserReviews = (currentPage: number, sort: string, category: string) =>
        profile && dispatch(getReviewsThunk({
            currentPage,
            search: {value: '', sort, category, authorID: profile.id}
        }));
    const getUserRatedReviews = (currentPage: number, sort: string, category: string) =>
        profile && dispatch(getRatedReviewsThunk({
            currentPage,
            sort,
            category,
            id: profile.id
        }));
    useEffect(() => {
        id && dispatch(getOneUserThunk({id}));
        id && dispatch(getRatedReviewsThunk({id, currentPage: 1, category: '', sort: 'DATE UP'}));
    }, [id]);

    if (!!profile) return (
        <div className={isDarkTheme ? style.userItem : `${style.userItem} ${style.light}`}>
            <div className={style.profile}>
                {
                    profile &&
                    <Figure.Image
                        className={style.image}
                        alt={profile.name}
                        src={profile.photo}
                    />
                }
                {profile && <h4 className={style.name}>{profile.name}</h4>}
            </div>
            <UserReviewsTable isDarkTheme={isDarkTheme} getUserReviews={getUserReviews} profile={profile} user={user}
                              language={language}/>
            <UserRatedReviewsTable isDarkTheme={isDarkTheme} profile={profile}
                                   getUserRatedReviews={getUserRatedReviews} language={language}/>
        </div>
    )
    return <Loader/>

}



