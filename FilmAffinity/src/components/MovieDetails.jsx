import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import MovieReviewsContainer from './MovieReviews';
import { useAuth } from '../context/AuthContext';

function MovieInfo({movie}) {
    return <>
      <div className="movie-details" id="movieDetails">
        <img src={movie.poster} alt="Poster" id="poster" />
        <div className="info">
          <h2 id="title">{movie.title}</h2>
          <p id="rating">
          <strong>Rating: </strong>
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
          <p>
            <strong>Genre: </strong>{movie.genres.map(genre => genre).join(', ')}
            <span id="genres" />
          </p>
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

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:8000/filmaffinity/movies/${id}/`);
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
        <NavLink to="/movies/catalog/" className="boton-volver">Return to Catalog</NavLink>
        <MovieInfo movie={movie}/>
        <MovieReviewsContainer movie={movie}/>
      </div>
    </>
  );
}


export default MovieDetails;