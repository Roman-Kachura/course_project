import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../c2-auth/Login';
import {Registration} from '../c2-auth/Registration';
import {Content} from '../c3-content/Content';
import {Setting} from '../c4-setting/Setting';

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/content" element={<Content/>}/>
            <Route path="/setting" element={<Setting/>}/>
            <Route path="*" element={<Navigate to={'/content'}/>}/>
        </Routes>
    )
}