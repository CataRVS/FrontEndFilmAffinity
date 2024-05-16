import { useState, useEffect } from 'react';
import './catalog.css';

import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const PAGE_SIZE = 9;
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
  const [showFilters, setShowFilters] = useState(false);
  return <>
    <div className="container">
      <h2>Movie Catalog</h2>
      {showFilters && <FilterList titleFilter={titleFilter}
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
                                  setLanguageFilter={setLanguageFilter}/>
      }
      <button className="button" onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
      <br/>
      <MovieList movieList={movieList}/>
      <PageFilter currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  </>
}


function FilterList({titleFilter,
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
                      setLanguageFilter,}) {
  return <>
      <div className="filter-container">
        <MovieFilter filterName="Title" movieFilter={titleFilter} setMovieFilter={setTitleFilter}/>
        <MovieFilter filterName="Rating" movieFilter={ratingFilter} setMovieFilter={setRatingFilter}/>
        <MovieFilter filterName="Genre" movieFilter={genreFilter} setMovieFilter={setGenreFilter}/>
        <MovieFilter filterName="Synopsis" movieFilter={synopsisFilter} setMovieFilter={setSynopsisFilter}/>
        <MovieFilter filterName="Actor" movieFilter={actorFilter} setMovieFilter={setActorFilter}/>
        <MovieFilter filterName="Director" movieFilter={directorFilter} setMovieFilter={setDirectorFilter}/>
        <MovieFilter filterName="Language" movieFilter={languageFilter} setMovieFilter={setLanguageFilter}/>
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
    <div className="paginator">
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
    <label htmlFor={filterName}>{filterName}: </label>
    {/* If the filter is a number, the input will be a number */}
    {/* If the filter is not a number, the input will be a text */}
    <input type={filterName === "Rating" ? "number" : "text"} 
           value={movieFilter === 0 ? '' : movieFilter} 
           onChange={(e) => changeFilter(e.target.value)}/>
    
  </>
}


function Movie({movie}) {
  return <>
    <div className="movie-info" id="movieDetails">
      <img src={movie.poster} alt="Poster" id="thumbnail" />
      <div className="info">
        <h3 id="title">{movie.title}</h3>
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
        <NavLink to={`/movies/catalog/${movie.id}`} key={movie.id} className="go-to-movie">
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

  const { isLoggedIn, isAdmin, checkSession } = useAuth();
  checkSession()

  useEffect(() => {
    const fetchMovies = async () => {
      const filters = new Filters();
      filters.setFilter('page', currentPage);
      filters.setFilter('page_size', PAGE_SIZE);
      filters.setFilter('title', titleFilter);
      filters.setFilter('rating', ratingFilter);
      filters.setFilter('genre', genreFilter);
      filters.setFilter('synopsis', synopsisFilter);
      filters.setFilter('actor', actorFilter);
      filters.setFilter('director', directorFilter);
      filters.setFilter('language', languageFilter);
      try {
        const response = await fetch(`http://localhost:8000/filmaffinity/movies/?${filters.getParams().toString()}`);
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


class Filters {
  constructor() {
    this.params = new URLSearchParams();
  }

  setFilter(key, value) {
    if (value !== '' && value !== 0) {
      this.params.set(key, value);
    }
  }

  getParams() {
    return this.params;
  }
}

export default Catalog;
