import { useState, useEffect } from 'react';
import './index.css';

import { NavLink } from 'react-router-dom';


function ListCatalog({movieList, ratingFilter, setRatingFilter}){
  return <>
    <div className="container">
      <h2>Movie Catalog</h2>
      <FilterRating ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}/>
      <MovieList movieList={movieList} ratingFilter={ratingFilter}/>
    </div>
  </>
}


function FilterRating({ratingFilter, setRatingFilter}){
  function changeFilter(e){
    // If the input is empty, set the filter to 0
    setRatingFilter(Math.max(0, Number(e)));
  }
  return <>
    <br/>
    <label htmlFor="ratingFilter">Filter by Rating: </label>  // antes era htmlFor="stockFilter"
    <input type="number" value={ratingFilter} onChange={(e) => changeFilter(e.target.value)}/>
  </>
}


function Movie({movie}) {
  return <>
    <div className="movie-details" id="movieDetails">
      <img src={movie.poster} alt="Thumbnail" id="thumbnail" />
      <div className="info">
        <h2 id="title">{movie.title}</h2>
        <p>
          <strong>Rating:</strong>{movie.rating}
          <span id="rating" />
        </p>
      </div>
    </div>
  </>
}


function MovieList({movieList = [], ratingkFilter}) {
  return <>
    <div id="movieList">
      {movieList.filter((movie) => (movie.rating >= ratingkFilter)).map((movie) => (
        <NavLink to={`/movies/catalog/${movie.id}`}>
          <Movie key={movie.id} movie={movie} />
        </NavLink>
      ))}
    </div>
  </>
}


function Catalog() {
  const [movieList, setMovieList] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {

      try {
        // TODO: fetch movies from Djando API
        const response = await fetch(`https://localhost:8000/api/movies`); // Meter el endpoint de la API
        if (!response.ok) {
          throw new Error("We couldn't retrieve the movies");
        }

        const data = await response.json();
        total_products = data.total;
        setMovieList(data.products);
      } catch (error) {
        console.error('Error retrieving movies: ', error);
      }
    };

    fetchMovies();
  }, []); // currentPage

  return (
      <ListCatalog movieList={movieList} ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}/>
  );
}

export default Catalog;
