import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../c2-main/m3-auth/Login';
import {Registration} from '../c2-main/m3-auth/Registration';
import {Reviews} from '../c2-main/m0-reviews/Reviews';
import {SettingContainer} from '../c2-main/m1-setting/Setting';
import {Users} from '../c2-main/m4-users/Users';
import {Categories} from '../c2-main/m6-categories/Categories';
import {ReviewItem} from '../c2-main/m0-reviews/ReviewItem';
import {CreateReview} from '../c2-main/m0-reviews/CreateReview';

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/reviews" element={<Reviews/>}/>
            <Route path="/my-reviews" element={<Reviews isAuthor/>}/>
            <Route path="/reviews/:id" element={<ReviewItem/>}/>
            <Route path="/create-review" element={<CreateReview/>}/>
            <Route path="/setting" element={<SettingContainer/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="*" element={<Navigate to={'/reviews'}/>}/>
        </Routes>
    )
}