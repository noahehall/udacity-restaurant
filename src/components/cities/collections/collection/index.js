import React from 'react';
import Restaurants from 'components/cities/restaurants';

export const Collection = ({
  addReview,
  cityName,
  cityId,
  collection,
  getRestaurants,
  restaurants,
  reviews,
}) => {
  if (appFuncs._.isEmpty(collection)) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    getRestaurants({
      city: cityName,
      collection: collection.title,
      params: {
        'collection_id': collection.collection_id,
        'entity_id': cityId,
        'entity_type': 'city',
      },
      type: 'search',
    });
  };

  return (
    <article>
      <h3>
        {collection.title}
        <button
          id='get-restaurants'
          onClick={handleClick}
        >
          Get Restaurants
        </button>
      </h3>
      <div>{collection.description}</div>
      <Restaurants
        addReview={addReview}
        cityName={cityName}
        getReviews={getRestaurants}
        restaurants={restaurants}
        reviews={reviews}
      />
    </article>
  );
};

Collection.propTypes = {
  addReview: React.PropTypes.func,
  cityId: React.PropTypes.number,
  cityName: React.PropTypes.string,
  collection: React.PropTypes.object,
  getRestaurants: React.PropTypes.func,
  restaurants: React.PropTypes.object,
  reviews: React.PropTypes.object,
};

export default Collection;
