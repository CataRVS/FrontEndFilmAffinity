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
                        <NavLink className="header-link" to="/movies/catalog">Movies</NavLink>
                    </li>
                    <li>
                        <NavLink className="header-link" to="/moreInfo">About us</NavLink>
                    </li>
                    {/*If we are admin we can also add movies and get a tab for that*/}
                    {isAdmin && (
                        <li>
                            <NavLink className="header-link" to="/movies/add">Add Movie</NavLink>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li onClick={toggleDropdown}>
                            <span className="header-link">Profile</span>
                            {showDropdown && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink className="header-link" to="/users/profile">My Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="header-link" to="/users/edit-profile">Edit Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="header-link" to="/users/reviews">My Reviews</NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <NavLink className="header-link" to="/users/login">Login</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}
