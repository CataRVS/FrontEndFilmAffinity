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
                      setDirectorFilter}){
  return <>
    <div className="container">
      <h2>Movie Catalog</h2>
      <PageFilter currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <FilterTitle titleFilter={titleFilter} setTitleFilter={setTitleFilter}/>
      <FilterRating ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}/>
      <FilterGenre genreFilter={genreFilter} setGenreFilter={setGenreFilter}/>
      <FilterSynopsis synopsisFilter={synopsisFilter} setSynopsisFilter={setSynopsisFilter}/>
      <FilterActor actorFilter={actorFilter} setActorFilter={setActorFilter}/>
      <FilterDirector directorFilter={directorFilter} setDirectorFilter={setDirectorFilter}/>
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

function FilterTitle({titleFilter, setTitleFilter}){
  function changeFilter(e){
    setTitleFilter(e);
  }
  return <>
    <br/>
    <label htmlFor="titleFilter">Filter by Title: </label>
    <input type="text" value={titleFilter} onChange={(e) => changeFilter(e.target.value)}/>
  </>
}

function FilterRating({ratingFilter, setRatingFilter}){
  function changeFilter(e){
    // If the input is empty, set the filter to 0
    // The rating cannot be bigger than 10
    setRatingFilter(e === '' ? 0 : Math.min(10, Math.max(0, parseFloat(e))));
  }
  return <>
    <br/>
    <label htmlFor="ratingFilter">Filter by Rating: </label>
    <input type="number"
           value={ratingFilter === 0 ? '' : ratingFilter}
           onChange={(e) => changeFilter(e.target.value)}/>
    
  </>
}

function FilterGenre({genreFilter, setGenreFilter}){
  function changeFilter(e){
    setGenreFilter(e);
  }
  return <>
    <br/>
    <label htmlFor="genreFilter">Filter by Genre: </label>
    <input type="text" value={genreFilter} onChange={(e) => changeFilter(e.target.value)}/>
  </>
}

function FilterSynopsis({synopsisFilter, setSynopsisFilter}){
  function changeFilter(e){
    setSynopsisFilter(e);
  }
  return <>
    <br/>
    <label htmlFor="synopsisFilter">Filter by Synopsis: </label>
    <input type="text" value={synopsisFilter} onChange={(e) => changeFilter(e.target.value)}/>
  </>
}

function FilterActor({actorFilter, setActorFilter}){
  function changeFilter(e){
    setActorFilter(e);
  }
  return <>
    <br/>
    <label htmlFor="actorFilter">Filter by Actor: </label>
    <input type="text" value={actorFilter} onChange={(e) => changeFilter(e.target.value)}/>
  </>
}

function FilterDirector({directorFilter, setDirectorFilter}){
  function changeFilter(e){
    setDirectorFilter(e);
  }
  return <>
    <br/>
    <label htmlFor="directorFilter">Filter by Director: </label>
    <input type="text" value={directorFilter} onChange={(e) => changeFilter(e.target.value)}/>
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
      directorFilter]);

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
                   />
  );
}

export default Catalog;
