import React from 'react';
import Reviews from 'components/cities/reviews';
import styles from './restaurant.css';

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
    <article className='restaurant-entry'>
      <style scoped type='text/css'>{styles}</style>
      <section>
        <figure>
          <figcaption>
            <h5>
              <a
                href={restaurant.url}
                target='_blank'
                >
                {restaurant.name}
              </a>
            </h5>
          </figcaption>
          <img
            alt={`${restaurant.name} featured thumbnail`}
            className='image-responsive'
            src={restaurant.featured_image}
          />
        </figure>
        <section className='restaurant-info'>
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
        <button
          className='get-reviews'
          onClick={handleClick}
        >
          Get Reviews
        </button>
      </section>
      <form onSubmit={handleSubmit}>
        <section className='control-container'>
          <label htmlFor='review-text'>
            <span>Review: </span>
            <input id='review-text' />
          </label>
        </section>
        <section className='control-container'>
          <label htmlFor='user-name'>
            <span>Name: </span>
            <input id='user-name' />
          </label>
        </section>
        <input type='submit' value='Add Review' />
      </form>
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
