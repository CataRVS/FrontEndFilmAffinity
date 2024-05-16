import { useLoaderData, useNavigation, NavLink } from "react-router-dom";
import './movie_details.css';
import { useAuth } from "../context/AuthContext";

function Review({review}){
    return (
      <div className="movie-details">
        <img src={review.movie.poster} alt="Poster" id="poster" />
        <div className="info">
          <h3>{review.movie.title}</h3>
          <strong>Rating: </strong>{review.rating}
          <br/>
          <strong>Review: </strong>{review.comment}
        </div>
      </div>
    )
}

function ReviewList({reviews}){
    return (
      <>
        {reviews.map(review => (
        <NavLink to={`/movies/catalog/${review.movie.id}`} key={review.id}>
            <Review key={review.id} review={review}/>
        </NavLink>))}
      </>
    )
}


function UserReviews() {
    // We get the user information
    const ratings = useLoaderData();
    const navigation = useNavigation();
    const busy = navigation.state === 'submitting' ||
                navigation.state === 'loading';
    const { isLoggedIn, isAdmin, checkSession } = useAuth();
    checkSession();
    return (
        <>
        <div className="container-details">
            <h1>My Reviews</h1>
            <ReviewList reviews={ratings}/>
        </div>
        </>
    )
}

export default UserReviews;