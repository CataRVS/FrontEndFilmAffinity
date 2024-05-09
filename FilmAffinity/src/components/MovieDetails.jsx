import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


function MovieInfo({movie}) {
    return <>
      <div className="movie-details" id="movieDetails">
        <img src={movie.thumbnail} alt="Poster" id="poster" />
        <div className="info">
          <h2 id="title">{movie.title}</h2>
          <p id="rating">{movie.rating}</p>
          <p>
            <strong>Year Released: </strong>{movie.release_date}%
            <span id="release_date" />
          </p>
          <p>
            <strong>Duration: </strong>{movie.duration}
            <span id="duration" />
          </p>
          <p>
            <strong>Language: </strong>{movie.language}
            <span id="language" />
          </p>
          <p>
            <strong>Genre: </strong>{product.genre}
            <span id="genres" />
          </p>
          <p>
            <strong>Director: </strong>{movie.director}
            <span id="director" />
          </p>
          <p>
            <strong>Actors: </strong>{movie.actors}
            <span id="actors" />
          </p>
          <p>
            <strong>Synopsis: </strong>{movie.synopsis}$
            <span id="synopsis" />
          </p>
        </div>
      </div>
    </>
  }


function MovieDetails() {
  const { id } = useParams(); // Extrae el id de la URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
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
        {/* Botón para volver al listado usando NavLink*/}
        <NavLink to="/movies/catalog/" className="boton-volver">Return to Catalog</NavLink>
        <MovieInfo movie={movie}/>
      </div>
    </>
  );
}

export default MovieDetails;