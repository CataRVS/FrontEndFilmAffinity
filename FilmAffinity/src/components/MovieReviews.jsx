import React, { useState, useEffect } from 'react';
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Form } from 'react-router-dom';

function Review({review}){
  return (
      <div className="card">
        <strong>User: </strong>{review.user}
        <br/>
        <strong>Rating: </strong>{review.rating}
        <br/>
        <strong>Review: </strong>{review.comment}
      </div>
  )
}

function ReviewList({reviews, showReviews, toggleReviews}){
  return (
    <>
      <button onClick={toggleReviews}>{showReviews ? "Hide Reviews" : "Show Reviews"}</button>
      {showReviews &&
      <div className="reviews">
        {reviews.map(review => (
          <div key={review.id} className="review">
            <Review review={review}/>
          </div>
        ))}
      </div>
      }
    </>
  )
}


function CreateNewReview({newReview, setNewReview}){
  const handleChange = (event) => {
    const {name, value} = event.target;
    setNewReview({...newReview, [name]: value});
  }

  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Card variant="outlined" sx={{minWidth: '15%'}}>
          <Form method="put">
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
            <CardActions>
              <Button type="submit" variant="outlined" color="warning" size="small">
                Add Review
              </Button>
            </CardActions>
          </Form>
        </Card>
      </Stack>
    </>
  )
}

function CreateNewReviewContainer({movie,
                                   newReview,
                                   setNewReview}) {
  return (
    <>
      <h2>Add a new review</h2>
      <br/>
      <CreateNewReview movie={movie} newReview={newReview} setNewReview={setNewReview}/>
    </>
  )
}



function MovieReviewsContainer({movie}){

  // Fetch the reviews for the movie
  const [reviews, setReviews] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState({rating: 0, comment: ""});

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
        console.log(data);
        setReviews(data); // Update the state with the reviews
      } catch (error) {
        console.error('Error while requesting movie reviews:', error);
      }
    };

    fetchReviews();
  }, [movie.id]); // This effect will run every time the movie id changes

  if (!reviews) {
    return <div>Loading...</div>; // Show a loading message or a spinner
  }

  return (
    <>
      <h2>Reviews</h2>
      <ReviewList reviews={reviews}
                  showReviews={showReviews}
                  toggleReviews={toggleShowReviews}/>
      <CreateNewReviewContainer newReview={newReview}
                                setNewReview={setNewReview}/>
    </>
  )
}

export default MovieReviewsContainer;