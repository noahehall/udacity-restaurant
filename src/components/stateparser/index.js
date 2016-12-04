import React from 'react';

export const StateParser = ({ cities, collections, dispatch, reviews, search }) => {
  let city, cityId, collection, collectionId, idx = 0;
  const max = 15;

  if (!appFuncs._.isEmpty(collections) && !appFuncs._.isEmpty(cities) && appFuncs._.isEmpty(search)) {
    for (const first in cities) {
      cityId = cities[first].id;
      city = first;
      break;
    }
    for (const first in collections[city]) {
      collectionId = collections[city][first].collection.collection_id;
      collection = first;

      if (collectionId && cityId && idx < max) {
        idx++;
        try {
          let test; // eslint-disable-line
          if (test = search[city][collection]) {
            // do nothing
          }
        } catch (err) {
          dispatch.requestZomato({
            city,
            collection,
            params: {
              'collection_id': collectionId,
              'entity_id': cityId,
              'entity_type': 'city',
            },
            type: 'search',
          });
        }
      } else break;
    }
  }else if (!appFuncs._.isEmpty(cities) && appFuncs._.isEmpty(collections)) {
    for (const first in cities) {
      cityId = cities[first].id;
      city = first;
      break;
    }
    dispatch.requestZomato({
      city,
      params: {
        'city_id': cityId,
      },
      type: 'collections',
    });
  }

  if (
    !appFuncs._.isEmpty(cities) &&
    !appFuncs._.isEmpty(search) &&
    !appFuncs._.isEmpty(collections) &&
    appFuncs._.isEmpty(reviews)
  ) {
    for (const first in cities) {
      cityId = cities[first].id;
      city = first;
      break;
    }

    for (const first in search[city]) {
      for (const rest in search[city][first]) {
        dispatch.requestZomato({
          city,
          params: {
            'res_id': search[city][first][rest].restaurant.R.res_id,
          },
          restaurant: search[city][first][rest].restaurant.name,
          type: 'reviews',
        });
        break;
      }
      break;
    }
  }

  return null;
};

StateParser.propTypes = {
  cities: React.PropTypes.object,
  collections: React.PropTypes.object,
  dispatch: React.PropTypes.function,
  reviews: React.PropTypes.object,
  search: React.PropTypes.object,
};

export default StateParser;
