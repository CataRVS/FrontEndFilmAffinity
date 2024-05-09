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
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Acciones y carga de datos de las rutas y elementos
async function signIn({ request }) {
  const formData = await request.formData();
  const {email, password} = Object.fromEntries(formData);
  const loginRes = await login(email, password);
  if (loginRes.ok) return redirect('/movie/catalog')
  return {status: loginRes.status};
}

async function registerUser({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  const registerRes = await registro(user);
  if (registerRes.ok) return redirect('/users/login/?registered');
  return {status: registerRes.status};
}
