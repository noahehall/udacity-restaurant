import React from 'react';
import Collection from './collection';

export const Collections = ({
  addReview,
  cityId,
  cityName,
  collections,
  filterProps,
  filters,
  getRestaurants,
  restaurants,
  reviews
}) => {
  if (appFuncs._.isEmpty(collections)) return null;

  const collectionList = [];

  if (!appFuncs._.isEmpty(collections))
    for (const coll in collections)
      collectionList.push(
        <li key={coll}>
          <Collection
            addReview={addReview}
            cityId={cityId}
            cityName={cityName}
            collection={collections[coll].collection}
            filterProps={filterProps}
            filters={filters}
            getRestaurants={getRestaurants}
            restaurants={filterProps(
              restaurants[coll]|| {},
              'restaurant',
              filters.restaurant,
            )}
            reviews={reviews}
          />
        </li>
      );


  return (
    <ul>{collectionList}</ul>
  );
};

Collections.propTypes = {
  addReview: React.PropTypes.func,
  cityId: React.PropTypes.number,
  cityName: React.PropTypes.string,
  collections: React.PropTypes.object,
  filterProps: React.PropTypes.func,
  filters: React.PropTypes.object,
  getRestaurants: React.PropTypes.func,
  restaurants: React.PropTypes.object,
  reviews: React.PropTypes.object,
};

export default Collections;
