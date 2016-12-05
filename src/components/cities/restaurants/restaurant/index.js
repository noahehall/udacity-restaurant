import React from 'react';
import Reviews from 'components/cities/reviews';

export const Restaurant = ({
  addReview,
  cityName,
  getReviews,
  restaurant,
  reviews,
}) => { // eslint-disable-line
  if (appFuncs._.isEmpty(restaurant)) return null;

  const hasReviews = !reviews.noneExist;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    getReviews({
      city: cityName,
      params: {
        'res_id': restaurant.R.res_id,
      },
      restaurant: restaurant.name,
      type: 'reviews',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const reviewText = e.target['review-text'].value.trim();
    const userName = e.target['user-name'].value.trim();

    if (reviewText && userName)
      addReview({
        city: cityName,
        restaurant: restaurant.name,
        reviewText,
        userName,
      });
  };

  return (
    <article>
      <h4>
        {restaurant.name}
        <button
          id='get-reviews'
          onClick={handleClick}
        >
          Get Reviews
        </button>
      </h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor='review-text'>
          Review: <input id='review-text' />
        </label>
        <label htmlFor='user-name'>
          Name: <input id='user-name' />
        </label>
        <input type='submit' value='submit' />
      </form>
      <section>
        <a
          href={restaurant.url}
          target='_blank'
          >
          website
        </a>
        <div>
          Cuisine: {restaurant.cuisines}
        </div>
        <div>
          Avg Price for 2: {restaurant.average_cost_for_two}
        </div>
        <div>
          5 Star Rating: {restaurant.user_rating.aggregate_rating}
        </div>
      </section>
      <article>
        {
          hasReviews ?
            <Reviews
              reviews={reviews}
            /> :
              <div>No Reviews Exist</div>
        }
      </article>
    </article>
  );
};

Restaurant.propTypes = {
  addReview: React.PropTypes.func,
  cityName: React.PropTypes.string,
  getReviews: React.PropTypes.func,
  restaurant: React.PropTypes.object,
  reviews: React.PropTypes.object,
};

export default Restaurant;
