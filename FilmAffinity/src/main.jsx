import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UserProfileEdit from "./components/UserProfileEdit.jsx";
import UserProfileInformation from "./components/UserProfileInformation.jsx";
import Catalog from "./components/Catalog.jsx";
import MoreInfo from "./components/MoreInfo.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import App from "./components/App.jsx";
import UserReviews from './components/UserReviews.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";


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
      element: <PrivateRoute><UserProfileInformation/></PrivateRoute>,
      loader: fetchUserProfile,
      action: logoutUser
    },
    {
      path: "/users/edit-profile",
      element: <PrivateRoute><UserProfileEdit/></PrivateRoute>,
      loader: fetchUserProfile,
      action: actionUserProfile,
    },
    {
      path: "/users/reviews",
      element: <PrivateRoute><UserReviews/></PrivateRoute>,
      loader: fetchUserReviews
    },
    {
      path: "/movies/catalog",
      element: <Catalog/>
    },
    {
      path: "/movies/catalog/:id",
      element: <MovieDetails/>,
      action: createReview
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
  if (loginRes.ok) {
    return redirect('/movies/catalog');
  }
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
  if (registerRes.ok){
    return redirect('/users/login/');
  }
  return {status: registerRes.status};
}

async function fetchUserProfile() {
  // Check if the user is logged in using authProvider
  const data = {
    method: 'GET',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'}
  };

  const response = await fetch('http://localhost:8000/filmaffinity/users/info/', data);

  if (!response.ok){
    // throw new Error('Error fetching user profile');
    return {status: response.status};
  }
  var data_j = await response.json();
  return await data_j;
}

async function logoutUser() {
  const data = {
    method: 'DELETE',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'}
  };

  const response = await fetch('http://localhost:8000/filmaffinity/users/logout/', data);

  if (!response.ok){
    throw new Error('Error logging out');
  }
  return redirect('/users/login/');
}

async function actionUserProfile({ request }) {
  if (request.method === 'DELETE') {
    const data = {
      method: 'DELETE',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    };
  
    // Add a confirmation window
    if (!window.confirm('Are you sure you want to delete your profile?')) {
      return redirect('/users/profile');
    }
  
    const response = await fetch('http://localhost:8000/filmaffinity/users/info/', data);
    if (!response.ok){
      throw new Error('Error deleting user profile');
    }
    // Redirect to login
    return redirect('/users/login/?deleted');
  }
  else {
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
    // Redirect to profile
    return redirect('/users/profile');
  }
}

async function fetchUserReviews() {
  const data = {
    method: 'GET',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'}
  };

  const response = await fetch('http://localhost:8000/filmaffinity/users/ratings/', data);

  if (!response.ok){
    return {status: response.status};
  }
  var data_j = await response.json();
  return await data_j;
}

async function createReview({ request }) {
  const formData = await request.formData();
  // Get the movie id from the URL
  const id = window.location.pathname.split('/').pop();
  const review = Object.fromEntries(formData);

  if (request.method === 'POST') {
    review['movie'] = id;
    const data = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(review),
      credentials: 'include'
    };
    var response = await fetch(`http://localhost:8000/filmaffinity/movies/${id}/rating/`, data);
  }
  else if (request.method === 'PUT') {
    const data = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(review),
      credentials: 'include'
    };
    var response = await fetch(`http://localhost:8000/filmaffinity/movies/${id}/rating/user-rating/`, data);
  }
  else {
    const data = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    };
    var response = await fetch(`http://localhost:8000/filmaffinity/movies/${id}/rating/user-rating/`, data);
  }
  if (!response.ok){
    // Show a window alert
    alert('Error creating review');
  }
  // Reload and redirect to the same page
  window.location.reload();
  return redirect(`/movies/catalog/${id}`);
}
