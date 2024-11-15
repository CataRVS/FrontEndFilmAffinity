// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BACKEND_URL } from "../Config.js"

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const checkSession = async () => {
        try {
            // fetch to django to check if the session is still active
            const response = await fetch(BACKEND_URL + '/filmaffinity/users/check-session/', {
                method: 'GET',
                credentials: 'include'
            });

            // If response status = 401 we are not logged in
            if (response.status === 401) {
                setIsLoggedIn(false);
            }

            // If response status = 200 we are logged in
            else if (response.status === 200) {
                setIsLoggedIn(true);
            }
            
            // Every other status code is an error
            else {
                throw new Error('Failed to check session');
            }

            // Check if the user is admin
            const isAdminResponse = await fetch(BACKEND_URL + '/filmaffinity/users/check-admin/', {
                method: 'GET',
                credentials: 'include'
            });

            if (isAdminResponse.status === 200) {
                setIsAdmin(true);
            }
            else if (isAdminResponse.status === 401) {
                setIsAdmin(false);
            }
            else {
                throw new Error('Failed to check if user is admin');
            }

        } catch (error) {
            console.error('Failed to check session', error);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
};