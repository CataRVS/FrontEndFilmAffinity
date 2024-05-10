import { useState, useEffect } from 'react';
import './catalog.css';

import { NavLink } from 'react-router-dom';

const PAGE_SIZE = 10;
const INITIAL_PAGE = 1;
var total_products = 16;


function ListCatalog({movieList,
                      currentPage,
                      setCurrentPage,
                      titleFilter,
                      setTitleFilter,
                      ratingFilter,
                      setRatingFilter,
                      genreFilter,
                      setGenreFilter,
                      synopsisFilter,
                      setSynopsisFilter,
                      actorFilter,
                      setActorFilter,
                      directorFilter,
                      setDirectorFilter,
                      languageFilter,
                      setLanguageFilter,}){
  return <>
    <div className="container">
      <h2>Movie Catalog</h2>
      <PageFilter currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <MovieFilter filterName="Title" movieFilter={titleFilter} setMovieFilter={setTitleFilter}/>
      <MovieFilter filterName="Rating" movieFilter={ratingFilter} setMovieFilter={setRatingFilter}/>
      <MovieFilter filterName="Genre" movieFilter={genreFilter} setMovieFilter={setGenreFilter}/>
      <MovieFilter filterName="Synopsis" movieFilter={synopsisFilter} setMovieFilter={setSynopsisFilter}/>
      <MovieFilter filterName="Actor" movieFilter={actorFilter} setMovieFilter={setActorFilter}/>
      <MovieFilter filterName="Director" movieFilter={directorFilter} setMovieFilter={setDirectorFilter}/>
      <MovieFilter filterName="Language" movieFilter={languageFilter} setMovieFilter={setLanguageFilter}/>
      <MovieList movieList={movieList}/>
    </div>
  </>
}

function PageFilter({currentPage, setCurrentPage}) {
  function changePage(page){
    page = Math.max(1, page);
    page = Math.min(Math.ceil(total_products / PAGE_SIZE), page);
    setCurrentPage(page);
  }
  return <>
    <div className="buttons">
      <button onClick={() => changePage(currentPage - 1)} disabled={currentPage==INITIAL_PAGE}>&lt;</button>
      <input type="number" value={currentPage} onChange={(e) => changePage(e.target.value)}/>
      <button onClick={() => changePage(currentPage + 1)} disabled={currentPage==Math.ceil(total_products / PAGE_SIZE)}>&gt;</button>
    </div>
  </>
}

function MovieFilter({filterName, movieFilter, setMovieFilter}){
  function changeFilter(e){

    if (filterName === "Rating") {
      // If the input is empty, set the filter to 0
      // The rating cannot be bigger than 10
      setMovieFilter(e === '' ? 0 : Math.min(10, Math.max(0, parseFloat(e))));
    }
    else {
      setMovieFilter(e);
    }
  }
  return <>
    <br/>
    <label htmlFor={filterName}>Filter by {filterName}: </label>
    {/* If the filter is a number, the input will be a number */}
    {/* If the filter is not a number, the input will be a text */}
    <input type={filterName === "Rating" ? "number" : "text"} 
           value={movieFilter === 0 ? '' : movieFilter} 
           onChange={(e) => changeFilter(e.target.value)}/>
    
  </>
}


function Movie({movie}) {
  return <>
    <div className="movie-details" id="movieDetails">
      <img src={movie.poster} alt="Thumbnail" id="thumbnail" />
      <div className="info">
        <h2 id="title">{movie.title}</h2>
        <p>
          <strong>Rating: </strong>
          {/* If the movie has no rating, it will be "Not rated" */}
          {/* If the movie has a rating, it will be shown with two decimals */}
          {/* toFixed(2) returns a string, and numbers such as 7 are turned into 7.00 */}
          {/* parseFloat() is used to turn the string back into a number (7.00=7)*/}
          {movie.average_rating ? parseFloat(movie.average_rating.toFixed(2)) + " / 10": "Not rated"}
          <span id="rating" />
        </p>
      </div>
    </div>
  </>
}


function MovieList({movieList = []}) {
  return <>
    <div id="movieList">
      {movieList.map((movie) => (
        <NavLink to={`/movies/catalog/${movie.id}`} key={movie.id}>
          <Movie key={movie.id} movie={movie} />
        </NavLink>
      ))}
    </div>
  </>
}


function Catalog() {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [genreFilter, setGenreFilter] = useState('');
  const [synopsisFilter, setSynopsisFilter] = useState('');
  const [actorFilter, setActorFilter] = useState('');
  const [directorFilter, setDirectorFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {

      // Create a Parameters object to include the page and page_size
      const params = new URLSearchParams({
        page: currentPage,
        page_size: PAGE_SIZE,
      });

      // If the title filter is not empty, include it in the parameters
      // The database will filter the movies with the title
      if (titleFilter !== '') {
        params.append('title', titleFilter);
      }

      // If the rating filter is greater than 0, include it in the parameters
      // The database will filter the movies with a rating greater than the filter
      if (ratingFilter > 0) {
        params.append('rating', ratingFilter);
      }

      // If the genre filter is not empty, include it in the parameters
      // The database will filter the movies with the genre
      if (genreFilter !== '') {
        params.append('genre', genreFilter);
      }

      // If the synopsis filter is not empty, include it in the parameters
      // The database will filter the movies with the synopsis
      if (synopsisFilter !== '') {
        params.append('synopsis', synopsisFilter);
      }

      // If the actor filter is not empty, include it in the parameters
      // The database will filter the movies with the actor
      if (actorFilter !== '') {
        params.append('actor', actorFilter);
      }

      // If the director filter is not empty, include it in the parameters
      // The database will filter the movies with the director
      if (directorFilter !== '') {
        params.append('director', directorFilter);
      }

      // If the language filter is not empty, include it in the parameters
      // The database will filter the movies with the language
      if (languageFilter !== '') {
        params.append('language', languageFilter);
      }

      try {
        const response = await fetch(`http://localhost:8000/filmaffinity/movies/?${params.toString()}`);
        if (!response.ok) {
          throw new Error("We couldn't retrieve the movies");
        }

        const data = await response.json();
        total_products = data.count;
        setMovieList(data.results);
      } catch (error) {
        console.error('Error retrieving movies: ', error);
      }
    };

    fetchMovies();
  }, [currentPage,
      titleFilter,
      ratingFilter,
      genreFilter,
      synopsisFilter,
      actorFilter,
      directorFilter,
      languageFilter]);

  return (
      <ListCatalog movieList={movieList} 
                   currentPage={currentPage} 
                   setCurrentPage={setCurrentPage}
                   titleFilter={titleFilter}
                   setTitleFilter={setTitleFilter}
                   ratingFilter={ratingFilter} 
                   setRatingFilter={setRatingFilter}
                   genreFilter={genreFilter}
                   setGenreFilter={setGenreFilter}
                   synopsisFilter={synopsisFilter}
                   setSynopsisFilter={setSynopsisFilter}
                   actorFilter={actorFilter}
                   setActorFilter={setActorFilter}
                   directorFilter={directorFilter}
                   setDirectorFilter={setDirectorFilter}
                   languageFilter={languageFilter}
                   setLanguageFilter={setLanguageFilter}
                   />
  );
}

export default Catalog;
