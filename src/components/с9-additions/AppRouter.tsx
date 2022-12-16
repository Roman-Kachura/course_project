import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../c2-main/m3-auth/Login';
import {Registration} from '../c2-main/m3-auth/Registration';
import {Collections} from '../c2-main/m0-collections/Collections';
import {Setting} from '../c2-main/m1-setting/Setting';
import {Users} from '../c2-main/m4-users/Users';
import {CreateCollection} from './CreateCollection';

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/collections" element={<Collections/>}/>
            <Route path="/setting" element={<Setting/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/create-collection" element={<CreateCollection/>}/>
            <Route path="*" element={<Navigate to={'/collections'}/>}/>
        </Routes>
    )
}