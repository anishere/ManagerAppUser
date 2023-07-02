/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route } from 'react-router';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import TableUser from '../components/TableUser';
import PrivateRoute from './PrivateRoute';
import NotFound from '../components/NotFound';

function AppRoutes(props) {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <TableUser/>
                        </PrivateRoute>
                    }
                />
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default AppRoutes;