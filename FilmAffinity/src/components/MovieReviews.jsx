import React, { useState, useEffect } from 'react';
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Form, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Review({review}) {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2, backgroundColor: "#f9f9f9" }}>
      <CardContent>
        <Typography variant="subtitle1" component="h3">
          <strong>{review.user}</strong>
        </Typography>
        <Typography variant="body2" component="p">
          <strong>Rating:</strong> {review.rating}
        </Typography>
        <Typography variant="body2" component="p">
          {review.comment && <><strong>Review:</strong> {review.comment}</>}
        </Typography>
      </CardContent>
    </Card>
  );
}


function ReviewList({reviews, showReviews, toggleReviews}) {
  return (
    <>
      {showReviews && (
        <div className="reviews">
          {reviews.map(review => (
            <Review key={review.id} review={review}/>
          ))}
        </div>
      )}
      <div className="button-container">
        <Button onClick={toggleReviews}>
            {showReviews ? "Hide Reviews" : "Show Reviews"}
        </Button>
      </div>
    </>
  );
}

function CreateNewReview({newReview, setNewReview, hasReviewed}){
  const handleChange = (event) => {
    // Rating must be between 1 and 10
    if (event.target.name === "rating") {
      event.target.value = Math.min(10, Math.max(1, event.target.value));
    }
    const {name, value} = event.target;
    setNewReview({...newReview, [name]: value});
  }

  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Card variant="outlined" sx={{ minWidth: '80%', margin: 'auto', padding: '20px' }}>
          <Form method={hasReviewed ? "put" : "post"}>
            <CardContent>
              <Stack direction="column" justifyContent="center" alignItems="center">
                <TextField margin="dense" size="small" required fullWidth
                  label="Rating"
                  name="rating"
                  type="number"
                  value={newReview.rating}
                  onChange={handleChange}
                />
                <TextField margin="dense" size="small" fullWidth
                  label="Comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleChange}
                />
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary" size="small">
                {hasReviewed ? "Edit Review" : "Add Review"}
              </Button>
            </CardActions>
          </Form>
          <Form method="delete">
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="error" size="small">
                Delete Review
              </Button>
            </CardActions>
          </Form>
        </Card>
      </Stack>
    </>
  )
}

function CreateNewReviewContainer({newReview,
                                   setNewReview,
                                   isLoggedIn,
                                   hasReviewed}) {
  return (
    <>
      {/* If we are logged in we can create a review */}
      { isLoggedIn ? 
      <>
        <h3 className="review">Add a new review</h3>
        <CreateNewReview newReview={newReview} setNewReview={setNewReview} hasReviewed={hasReviewed}/>
      </> : 
      <>
        <br/>
        <NavLink to='/users/login'><Button>Login to add a review</Button></NavLink>
      </>}
    </>
  )
}

async function fetchUserReview(movieId, isLoggedIn) {
  const data = {
    method: 'GET',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'}
  };
  if (!isLoggedIn) {
    return {rating: 1, comment: "", hasReviewed: false};
  }
  const response = await fetch(`http://localhost:8000/filmaffinity/movies/${movieId}/rating/user-rating/`, data);
  if (response.status === 404) {
    return {rating: 1, comment: "", hasReviewed: false};
  }
  if (!response.ok){
    throw new Error('Error fetching user review');
  }
  var data_j = await response.json();
  data_j.hasReviewed = true;
  return data_j;
}


function MovieReviewsContainer({movie}){

  // Fetch the reviews for the movie
  const [reviews, setReviews] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState({rating: 1, comment: ""});
  const [hasReviewed, setHasReviewed] = useState(false);

  // Get the togle triger from the context
  const { isLoggedIn, isAdmin, checkSession } = useAuth();

  // Force to check if we are logged in or not
  checkSession();

  const toggleShowReviews = () => {
    setShowReviews(!showReviews);
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8000/filmaffinity/movies/${movie.id}/rating/`);
        if (!response.ok) {
          throw new Error('It was not possible to obtain the reviews');
        }
        const data = await response.json();
        setReviews(data); // Update the state with the reviews
      } catch (error) {
        console.error('Error while requesting movie reviews:', error);
      }
    };
    const fetchInitialReview = async () => {
      try {
        const initialReview = await fetchUserReview(movie.id, isLoggedIn);
        setHasReviewed(initialReview.hasReviewed);
        setNewReview({rating: initialReview['rating'], comment: initialReview['comment']});
      } catch (error) {
        console.error('Error while fetching initial user review:', error);
      }
    };

    fetchReviews();
    fetchInitialReview();
  }, [movie.id]); // This effect will run every time the movie id changes

  if (!reviews) {
    return <div>Loading...</div>; // Show a loading message or a spinner
  }


  return (
    <>
      <h3 className="review">Reviews</h3>
      <ReviewList reviews={reviews}
                  showReviews={showReviews}
                  toggleReviews={toggleShowReviews}/>
      <CreateNewReviewContainer newReview={newReview}
                                setNewReview={setNewReview}
                                isLoggedIn={isLoggedIn}
                                hasReviewed={hasReviewed}/>
    </>
  )
}

export default MovieReviewsContainer;