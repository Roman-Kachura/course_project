import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../c2-main/m3-auth/Login';
import {Registration} from '../c2-main/m3-auth/Registration';
import {Reviews} from '../c2-main/m0-reviews/Reviews';
import {Setting} from '../c2-main/m1-setting/Setting';
import {Users} from '../c2-main/m4-users/Users';
import {CreateCategory} from './CreateCategory';

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/reviews" element={<Reviews/>}/>
            <Route path="/setting" element={<Setting/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/create-category" element={<CreateCategory/>}/>
            <Route path="*" element={<Navigate to={'/reviews'}/>}/>
        </Routes>
    )
}