import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';


export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const { isLoggedIn, isAdmin, checkSession } = useAuth();

    // Call to the server to check if we have logged in
    checkSession();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <header>
            <h1>FilmAffinity</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/movies/catalog">Movies</NavLink>
                    </li>
                    <li>
                        <NavLink to="/moreInfo">About us</NavLink>
                    </li>
                    {/* TODO: See if we put here profile or login. */}
                    {isLoggedIn && (
                        <li onClick={toggleDropdown}>
                            <span>Profile</span>
                            {showDropdown && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to="/users/profile">My Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/users/edit-profile">Edit Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/users/reviews">My Reviews</NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <NavLink to="/users/login">Login</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}
