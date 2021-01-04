import React from "react";
import { LoginView, RegisterView, DashboardView, SharedFileView } from "../views";
import { Main, User } from "../layout";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Upload from "../components/Upload";

const routes = [
    {
        path: "/dashboard",
        element: <User />,
        children: [
            {
                path: "/",
                element: <PrivateRoute element={DashboardView} />,
            },
        ],
    },
    {
        path: "/upload",
        element: <User />,
        children: [
            {
                path: "/",
                element: <PrivateRoute element={Upload} />,
            },
        ],
    },
    {
        path: "/logout",
        element: <Navigate to="/login" />,
    },
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "login",
                element: <LoginView />,
            },
            {
                path: "register",
                element: <RegisterView />,
            },
            {
                path: "/",
                element: <Navigate to="/register" />,
            },
        ],
    },
    {
        path: "/shared/:fileId",
        element: <SharedFileView />,
    },
];

export default routes;
