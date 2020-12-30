import React from 'react';
import { LoginView, RegisterView } from '../views';
import { Main } from '../layout';
import { Navigate } from 'react-router-dom';

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
    }
]

export default routes;