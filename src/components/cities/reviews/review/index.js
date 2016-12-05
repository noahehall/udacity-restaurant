import React from 'react';

export const Review = ({ review }) => {
  if (appFuncs._.isEmpty(review)) return null;

  return (
    <section>
      {review.review_text}
    </section>
  );
};

Review.propTypes = {
  review: React.PropTypes.object,
};

export default Review;
