import React from 'react';
import Restaurant from './restaurant';

export const Restaurants = ({
  addReview,
  cityName,
  getReviews,
  restaurants,
  reviews
}) => {
  if (appFuncs._.isEmpty(restaurants)) return null;

  const restaurantList = [];
  if (!appFuncs._.isEmpty(restaurants))
    for (const rest in restaurants)
      restaurantList.push(
        <Restaurant
          addReview={addReview}
          cityName={cityName}
          getReviews={getReviews}
          key={restaurants[rest].restaurant.name}
          restaurant={restaurants[rest].restaurant}
          reviews={reviews[restaurants[rest].restaurant.name] || {}}
        />
      );

  return (
    <article>
      {restaurantList}
    </article>
  );
};

Restaurants.propTypes = {
  addReview: React.PropTypes.func,
  cityName: React.PropTypes.string,
  getReviews: React.PropTypes.func,
  restaurants: React.PropTypes.object,
  reviews: React.PropTypes.object,
};

export default Restaurants;
