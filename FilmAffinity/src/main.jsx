import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Catalog from "./components/Catalog.jsx";
import MoreInfo from "./components/MoreInfo.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import App from "./components/App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";


// Configuración de rutas y componentes
const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [
    { 
      path: "/users/login",
      element: <Login/>,
      action: signIn
    },
    {
      path: "/users/register",
      element: <Register/>,
      action: registerUser
    },
    {
      path: "/users/profile",
      element: <UserProfile/>,
      loader: fetchUserProfile,
      action: changeUserProfile
    },
    {
      path: "/movies/catalog",
      element: <Catalog/>
    },
    {
      path: "/movies/catalog/:id",
      element: <MovieDetails/>
    },
    {
      path: "/moreInfo",
      element: <MoreInfo/>
    }
  ]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// Acciones y carga de datos de las rutas y elementos
async function signIn({ request }) {
  const formData = await request.formData();
  const {email, password} = Object.fromEntries(formData);
  // Call Django to login
  const data = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password}),
    credentials: 'include'
  };

  // django is at localhost:8000
  const loginRes = await fetch('http://localhost:8000/filmaffinity/users/login/', data);
  console.log(loginRes);
  if (loginRes.ok) return redirect('/movies/catalog')
  return {status: loginRes.status};
}

async function registerUser({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  const data = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  };
  const registerRes = await fetch('http://localhost:8000/filmaffinity/users/', data);
  if (registerRes.ok) return redirect('/users/login/?registered');
  return {status: registerRes.status};
}

async function fetchUserProfile() {
  const data = {
    method: 'GET',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'}
  };

  const response = await fetch('http://localhost:8000/filmaffinity/users/info/', data);

  if (!response.ok){
    throw new Error('Error fetching user profile');
  }
  return await response.json();
}

async function changeUserProfile({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  const data = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
    credentials: 'include'
  };

  const response = await fetch('http://localhost:8000/filmaffinity/users/info/', data);
  if (!response.ok){
    throw new Error('Error updating user profile');
  }
  return await response.json();
}