import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';


export default function Header() {
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
                    <li>
                        <NavLink to="/users/login">Login</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
