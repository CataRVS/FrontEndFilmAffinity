import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, isAdmin, checkSession } = useAuth();
    checkSession();

    if (!isLoggedIn) {
        // Redirigir a la página de login
        return <Navigate to="/users/login" replace />;
    }

    return children;
};

const PrivateAdminRoute = ({ children }) => {
    const { isLoggedIn, isAdmin, checkSession } = useAuth();
    checkSession();
    console.log("IS ADMIN");
    console.log(isAdmin);

    if (!isAdmin) {
        // Redirigir a la página de login
        return <Navigate to="/users/profile" replace />;
    }

    return children;
}

export { PrivateRoute, PrivateAdminRoute };
