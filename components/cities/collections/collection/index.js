import React from 'react';
import Restaurants from 'components/cities/restaurants';

export const Collection = ({ collection, getRestaurants, restaurants }) =>
  <article>
    <h3>{collection.title}</h3>
    <div>{collection.description}</div>
    <Restaurants
      getReviews={getRestaurants}
      restaurants={restaurants}
      />
  </article>
  ;

Collection.propTypes = {
  collection: React.PropTypes.object,
  getRestaurants: React.PropTypes.func,
  restaurants: React.PropTypes.object,
};

export default Collection;
