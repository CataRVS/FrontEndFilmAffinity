import React from 'react';
import './rating_stars.css';

const RatingStars = ({ rating }) => {

  if (!rating) {
    rating = 0;
  }
  const totalStars = 5;
  const rating_out_of_5 = rating / 2; // convert rating out of 10 to out of 5
  const fullStarCount = Math.floor(rating_out_of_5); // number of full stars
  const halfStar = rating_out_of_5 % 1 > 0.5; // does the rating have a half star?
  const emptyStars = totalStars - fullStarCount - (halfStar ? 1 : 0); // number of empty stars

  return (
    <div>
      {Array.from({ length: fullStarCount }, (_, i) => (
        <span key={i} className="star full">★</span>
      ))}
      {halfStar && <span className="star half">★</span>}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={i} className="star empty">★</span>
      ))}
    </div>
  );
};

export default RatingStars;
