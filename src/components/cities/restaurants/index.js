import React from 'react';
import Restaurant from './restaurant';

export const Restaurants = ({ restaurants }) => {
  const restaurantList = [];
  if (!appFuncs._.isEmpty(restaurants))
    for (const rest in restaurants)
      restaurantList.push(
        <Restaurant
          key={restaurants[rest].restaurant.name}
          restaurant={restaurants[rest].restaurant}
        />
      );

  return (
    <article>
      {restaurantList}
    </article>
  );
};

Restaurants.propTypes = {
  restaurants: React.PropTypes.object,
};

export default Restaurants;
