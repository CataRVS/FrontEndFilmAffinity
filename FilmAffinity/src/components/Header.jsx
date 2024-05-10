import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function Header() {
    const { isLoggedIn } = useAuth();
    // console.log(isLoggedIn);
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
                        <li>
                            <NavLink to="/users/profile">Profile</NavLink>
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
