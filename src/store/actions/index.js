require('../../.globals/');

import axios from 'axios';
// import { parseString } from 'xml2js';
const getZomato = axios.create({
  baseURL: appConsts.zomatoBaseUrl,
  headers: {
    Accept: 'application/json',
    'user-key': '684525f03d623e8bc1d53a44beceecc6',
  },
  timeout: 3000,
});

export function updateMsg (text) {
  return {
    text,
    type: 'UPDATE_MSG'
  };
}

export function zomato ({ data, endpoint, city }) {
  return {
    city,
    data,
    endpoint,
    type: 'ZOMATO',
  };
}

export function requestZomato ({
  city = '',
  collection= '',
  params = {},
  restaurant = '',
  type = '',
}) {
  if (!type) return null;

  const data = Object.keys(params).length ?
    { params } :
    {};

  switch (type) {
    case 'cities':
      data.params.count = 40;
      break;
    case 'collections':
      if (!data.params.city_id) return null;
      break;
    case 'reviews':
      if (!data.params.res_id) return null;
      break;
    case 'search':
      if (
        !data.params.entity_id ||
        !data.params.collection_id
      ) return null;
      break;
    default: return null;
  }

  const thisType = type;

  return getZomato.get(`/${type}`, data)
    .then(
      (success) => {
        let compiled, thisData;
        switch(thisType) {
          case 'cities':
            if (success.data.code !== 403) {
              thisData = appFuncs._.keyBy(
                success.data.location_suggestions,
                (object) => object.name);
              break;
            }

            return null;
          case 'collections':
            if (success.data.code !== 403) {
              compiled = appFuncs._.keyBy(
                success.data.collections,
                (object) => object.collection.title
              );

              thisData = {};
              thisData[city] = compiled;
            }

            break;
          case 'search':
            if (success.data.code !== 403 && city && collection) {
              if (success.data)
                compiled = appFuncs._.keyBy(
                  success.data.restaurants,
                  (object) => object.restaurant.name
                );
              else compiled = 'no restaurants';
              thisData = {};
              thisData[city] = {};
              thisData[city][collection] = compiled;
              break;
            }

            return null;
          case 'reviews':
            if (success.data.code !== 403 && city && restaurant) {
              if (success.data)
                compiled = appFuncs._.keyBy(
                  success.data.user_reviews,
                  (object) => object.review.user.zomato_handle
                );
              else compiled = 'no restaurants';
              thisData = {};
              thisData[city] = {};
              thisData[city][restaurant] = compiled;
              break;
            }

            return null;
          default: return null;
        }

        return thisData ? zomato({
          city,
          data: thisData,
          endpoint: thisType,
        }) :
        null;
      },
      (error) => {
        appFuncs.console('error')(error);

        return null;
      }
    );
}
