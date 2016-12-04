import React from 'react';
import Collection from './collection';

export const Collections = ({ cityId, cityName, collections, getRestaurants, restaurants }) => {
  const collectionList = [];

  if (!appFuncs._.isEmpty(collections))
    for (const coll in collections)
      collectionList.push(
        <li key={coll}>
          <Collection
            cityId={cityId}
            collection={collections[coll].collection}
            getRestaurants={getRestaurants}
            restaurants={restaurants[coll] || {}}
          />
        </li>
      );


  return (
    <article>
      collections for: {cityName}
      <ul>{collectionList}</ul>
    </article>
  );
};

Collections.propTypes = {
  cityId: React.PropTypes.string,
  cityName: React.PropTypes.string,
  collections: React.PropTypes.object,
  getRestaurants: React.PropTypes.func,
  restaurants: React.PropTypes.object,
};

export default Collections;
