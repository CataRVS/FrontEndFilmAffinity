import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import MovieReviewsContainer from './MovieReviews';
import { useAuth } from '../context/AuthContext';
import { useLoaderData, useNavigation, Form } from "react-router-dom";
import RatingStars from './RatingStars';
import './movie_details.css';
import { BACKEND_URL } from "../Config.js"

// function MovieInfo({ movie }) {
//   return (
//     <div className="movie-info" id={`movie-${movie.id}`}>
//       <img src={movie.poster} alt="Poster" className="thumbnail" />
//       <div className="info">
        // <h3 className="title">{movie.title}</h3>
        // <div className="rating">
        //   <RatingStars rating={parseFloat(movie.average_rating.toFixed(2))} />
        //   <span>{parseFloat(movie.average_rating.toFixed(2))} / 10</span>
        // </div>
//         <p className="year">Year Released: {movie.release_date}</p>
//         <p className="duration">Duration: {movie.duration} minutes</p>
//         <p className="language">Language: {movie.language}</p>
//         <div className="genres">
//           {movie.genres.map((genre, index) => (
//             <span key={index} className="genre-badge">{genre}</span>
//           ))}
//         </div>
//         <p className="director">Director: {movie.director}</p>
//         <p className="actors">Actors: {movie.actors.join(', ')}</p>
//         <p className="synopsis">Synopsis: {movie.synopsis}</p>
//       </div>
//     </div>
//   );
// }


function MovieInfo({movie}) {
    return <>
      <div className="movie-details" id="movieDetails">
        <img src={movie.poster} alt="Poster" id="poster-details" />
        <div className="info">
          <h2 id="title" className="movie-title">{movie.title}</h2>
          {/* <p id="rating">
          <strong>Rating: </strong>
            {movie.average_rating ? parseFloat(movie.average_rating.toFixed(2)) + " / 10": "Not rated"}
          </p> */}
        <p className="rating">
          {movie.average_rating ? <RatingStars rating={parseFloat(movie.average_rating.toFixed(2))} /> : 
                                  <RatingStars rating={0} />}
          {movie.average_rating ? parseFloat(movie.average_rating.toFixed(2)) + " / 10": "Not rated"}
        </p>
          <p>
            <strong>Year Released: </strong>{movie.release_date}
            <span id="release_date" />
          </p>
          <p>
            <strong>Duration: </strong>{movie.duration} minutes
            <span id="duration" />
          </p>
          <p>
            <strong>Language: </strong>{movie.language}
            <span id="language" />
          </p>
         <div className="genres">
          <p><strong>Genres: </strong></p>
           {movie.genres.map((genre, index) => (
             <span key={index} className="genre-badge">{genre}</span>
           ))}
         </div>
          <p>
            <strong>Director: </strong>{movie.director}
            <span id="director" />
          </p>
          <p>
            <strong>Actors: </strong>{movie.actors.map(actor => actor).join(', ')}
            <span id="actors" />
          </p>
          <p>
            <strong>Synopsis: </strong>{movie.synopsis}
            <span id="synopsis" />
          </p>
        </div>
      </div>
    </>
  }


function MovieDetails() {
  const { id } = useParams(); // Extrae el id de la URL
  const [ movie, setMovie ] = useState(null);
  const { isLoggedIn, isAdmin, checkSession } = useAuth();
  checkSession();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(BACKEND_URL + `/filmaffinity/movies/${id}/`);
        if (!response.ok) {
          throw new Error('It was not possible to obtain the movie details');
        }
        const data = await response.json();
        setMovie(data); // Actualiza el estado con los detalles del producto
      } catch (error) {
        console.error('Error while requesting movie details:', error);
      }
    };

    fetchMovie();
  }, [id]); // Este efecto se ejecutará cada vez que el id cambie

  if (!movie) {
    return <div>Loading...</div>; // Muestra un mensaje de carga o un spinner
  }

  return (
    <>
      <div className="container">
        <MovieInfo movie={movie}/>
        <div className="button-container">
          <NavLink to="/movies/catalog" className="boton-volver">Return to Catalog</NavLink>
          { isAdmin && 
          <NavLink to={`/movies/catalog/edit/${id}`} className="boton-edit">Edit</NavLink> }
        </div>
        <MovieReviewsContainer movie={movie}/>
      </div>
    </>
  );
}


export default MovieDetails;