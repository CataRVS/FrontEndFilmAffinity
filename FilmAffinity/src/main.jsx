import React from 'react';
import ReactDOM from 'react-dom/client';
// Other components
import App from "./components/App.jsx";
import { PrivateRoute, PrivateAdminRoute } from "./components/PrivateRoute.jsx";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
// User components
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UserProfileEdit from "./components/UserProfileEdit.jsx";
import UserProfileInformation from "./components/UserProfileInformation.jsx";
import UserReviews from './components/UserReviews.jsx';
// Movie components
import Catalog from "./components/Catalog.jsx";
import UpdateMovie from './components/UpdateMovie.jsx';
import MovieDetails from "./components/MovieDetails.jsx";
import AddMovie from "./components/AddMovie.jsx";
// MoreInfo component
import MoreInfo from "./components/MoreInfo.jsx";
import { BACKEND_URL } from "./Config.js"

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
      path: "/movies/catalog/edit/:id",
      element: <PrivateAdminRoute><UpdateMovie/></PrivateAdminRoute>,
      action: updateMovie
    },
    {
      path: "/movies/add",
      element: <PrivateAdminRoute><AddMovie/></PrivateAdminRoute>,
      action: createMovie
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
  const loginRes = await fetch(BACKEND_URL + '/filmaffinity/users/login/', data);
  // Get cookie from response cookies   
  const cookie = loginRes.headers.get('Set-Cookie');
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
  const registerRes = await fetch(BACKEND_URL + '/filmaffinity/users/', data);
  if (registerRes.ok){
    return redirect('/users/login');
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

  const response = await fetch(BACKEND_URL + '/filmaffinity/users/info/', data);

  if (!response.ok){
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

  const response = await fetch(BACKEND_URL + '/filmaffinity/users/logout/', data);

  if (!response.ok){
    return redirect('/users/profile');
  }
  return redirect('/users/login');
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
  
    const response = await fetch(BACKEND_URL + '/filmaffinity/users/info/', data);
    if (!response.ok){
      return redirect('/users/profile');
    }
    // Redirect to login
    return redirect('/users/login');
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

    const response = await fetch(BACKEND_URL + '/filmaffinity/users/info/', data);
    if (!response.ok){
      return redirect('/users/profile');
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

  const response = await fetch(BACKEND_URL + '/filmaffinity/users/ratings/', data);

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
    var response = await fetch(BACKEND_URL + `/filmaffinity/movies/${id}/rating/`, data);
  }
  else if (request.method === 'PUT') {
    const data = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(review),
      credentials: 'include'
    };
    var response = await fetch(BACKEND_URL + `/filmaffinity/movies/${id}/rating/user-rating/`, data);
  }
  else {
    const data = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    };
    var response = await fetch(BACKEND_URL + `/filmaffinity/movies/${id}/rating/user-rating/`, data);
  }
  if (!response.ok){
    // Show a window alert
    alert('Error creating review');
  }
  // Reload and redirect to the same page
  window.location.reload();
  return redirect(`/movies/catalog/${id}`);
}


async function updateMovie({ request }) {
  const id = window.location.pathname.split('/').pop();

  if (request.method === 'DELETE') {
    const data = {
      method: 'DELETE',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    };
  
    // Add a confirmation window
    if (!window.confirm('Are you sure you want to delete this movie?')) {
      const encodedId = encodeURIComponent(id);
      return redirect(`/movies/catalog/edit/${encodedId}`);
    }
  
    const response = await fetch(BACKEND_URL + `/filmaffinity/movies/${id}/`, data);
    if (!response.ok){
      return redirect('/movies/catalog');
    }
    // Redirect to catalog
    return redirect('/movies/catalog');
  }
  else {

    const formData = await request.formData();
    const rawMovieData = Object.fromEntries(formData);

    // Crear la lista de géneros
    const genres = [];
    Object.keys(rawMovieData).forEach(key => {
      if (key.startsWith('genre[')) {
        genres.push(rawMovieData[key]);
      }
    });

    // Crear la lista de actores
    const actors = [];
    Object.keys(rawMovieData).forEach(key => {
      if (key.startsWith('actors_name[')) {
        const index = key.match(/\d+/)[0]; // Extrae el índice numérico del nombre
        actors.push({
          name: rawMovieData[`actors_name[${index}]`],
          surname: rawMovieData[`actors_surname[${index}]`]
        });
      }
    });

    // Concatenar nombre y apellido del director
    const director = {"name": rawMovieData.director_name,
                      "surname": rawMovieData.director_surname};

    // Construir el objeto movie con el nuevo formato
    const movie = {
      title: rawMovieData.title,
      release_date: rawMovieData.release_date,
      duration: rawMovieData.duration,
      language: rawMovieData.language,
      genres_data: genres,
      actors_data: actors,
      director_data: director,
      synopsis: rawMovieData.synopsis
    };

    const data = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(movie),
      credentials: 'include'
    };

    const response = await fetch(BACKEND_URL + `/filmaffinity/movies/${id}/`, data);
    if (!response.ok){
      return redirect(`/movies/catalog/${id}`);
    }
    return redirect(`/movies/catalog/${id}`);
  }
}


async function createMovie({ request }) {
  const formData = await request.formData();
  const rawMovieData = Object.fromEntries(formData);
  
  // Transform the release_date to string format
  // year-month-date not in 05/09/2024' format
  const date = new Date(rawMovieData.release_date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const release_date = `${year}-${month}-${day}`;

  // Crear la lista de géneros
  const genres = [];
  Object.keys(rawMovieData).forEach(key => {
    if (key.startsWith('genre[')) {
      genres.push(rawMovieData[key]);
    }
  });

  // Crear la lista de actores
  const actors = [];
  Object.keys(rawMovieData).forEach(key => {
    if (key.startsWith('actors_name[')) {
      const index = key.match(/\d+/)[0]; // Extrae el índice numérico del nombre
      actors.push({
        name: rawMovieData[`actors_name[${index}]`],
        surname: rawMovieData[`actors_surname[${index}]`]
      });
    }
  });

  // Concatenar nombre y apellido del director
  const director = {"name": rawMovieData.director_name,
                    "surname": rawMovieData.director_surname};

  // Create form data with the information
  const movie = {
    title: rawMovieData.title,
    release_date: release_date,
    duration: rawMovieData.duration,
    language: rawMovieData.language,
    genres_data: genres,
    actors_data: actors,
    director_data: director,
    synopsis: rawMovieData.synopsis
  };


  const data = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(movie),
    credentials: 'include'
  };

  const response = await fetch(BACKEND_URL + '/filmaffinity/movies/', data);
  if (!response.ok){
    return redirect('/movies/catalog');
  }
  return redirect(`/movies/catalog`);
}