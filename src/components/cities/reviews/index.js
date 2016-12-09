import React from 'react';
import Review from './review';

export const Reviews = ({ reviews }) => {
  if (appFuncs._.isEmpty(reviews)) return null;

  const allReviews =[];

  for (const review in reviews)
    allReviews.push(
      <Review
        key={reviews[review].review.user.name}
        review={reviews[review].review}
      />
    );

  return (
    <article>
      <h5>Restaurant Reviews</h5>
      {allReviews}
    </article>
  );
};

Reviews.propTypes = {
  reviews: React.PropTypes.object,
};
export default Reviews;
