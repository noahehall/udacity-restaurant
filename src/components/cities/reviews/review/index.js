import React from 'react';
import styles from './review.css';

export const Review = ({ review }) => {
  if (appFuncs._.isEmpty(review)) return null;

  return (
    <section className='review-entry'>
      <style scoped type='text/css'>{styles}</style>
      <section>
        About Reviewer
      </section>
      <table className='review-table'>
        <tbody>
          <tr>
            <td>Username</td>
            <td>{review.user.name}</td>
          </tr>
          <tr>
            <td>Rating</td>
            <td>{review.rating}</td>
          </tr>
          <tr>
            <td>Timestamp</td>
            <td>{review.review_time_friendly}</td>
          </tr>
        </tbody>
      </table>
      <section className='review-text'>
        {review.review_text}
      </section>
    </section>
  );
};

Review.propTypes = {
  review: React.PropTypes.object,
};

export default Review;
