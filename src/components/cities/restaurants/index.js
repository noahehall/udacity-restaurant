import React from 'react';
import Restaurant from './restaurant';

export const Restaurants = ({
  addReview,
  cityName,
  filterProps, // eslint-disable-line
  filters, // eslint-disable-line
  getReviews,
  restaurants,
  reviews
}) => {
  // TODO: you need to combine these filters so you dont have to loop through multiple times
  const filtereddd = filterProps(restaurants, 'average_cost_for_two', filters.average_cost_for_two);
  const filteredd = filterProps(filtereddd, 'aggregate_rating', filters.aggregate_rating);
  const filtered = filterProps(filteredd, 'cuisines', filters.cuisines);
  if (appFuncs._.isEmpty(filtered)) return null;

  const restaurantList = [];
  for (const rest in filtered) {
    const thisRestaurant = filtered[rest].restaurant;

    restaurantList.push(
      <Restaurant
        addReview={addReview}
        cityName={cityName}
        getReviews={getReviews}
        key={thisRestaurant.name}
        restaurant={thisRestaurant}
        reviews={reviews[thisRestaurant.name] || {}}
      />
    );
  }

  return (
    <article>
      {restaurantList}
    </article>
  );
};

Restaurants.propTypes = {
  addReview: React.PropTypes.func,
  cityName: React.PropTypes.string,
  filterProps: React.PropTypes.func,
  filters: React.PropTypes.object,
  getReviews: React.PropTypes.func,
  restaurants: React.PropTypes.object,
  reviews: React.PropTypes.object,
};

export default Restaurants;
