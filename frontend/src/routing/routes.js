import React from 'react';
import { LoginView, RegisterView, DashboardView } from '../views';
import { Main } from '../layout';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const routes = [
    {
        path : "/",
        element: <Main />,
        children: [
            {
                path : "login",
                element : <LoginView />
            },
            {
                path : "register",
                element : <RegisterView />
            },
            {
                path : "/",
                element : <Navigate to="/register" />
            }
        ]
    },
    {
        path : '/dashboard',
        element : <PrivateRoute element={DashboardView} />
    }
]

export default routes;