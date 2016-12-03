require('../../.globals/');

import axios from 'axios';
// import { parseString } from 'xml2js';
const getZomato = axios.create({
  baseURL: appConsts.zomatoBaseUrl,
  headers: {
    Accept: 'application/json',
    'user-key': appConsts.zomatoApiKey,
  },
  timeout: 3000,
});

export function updateMsg (text) {
  return {
    text,
    type: 'UPDATE_MSG'
  };
}

export function zomato ({ data, endpoint }) {
  return {
    data,
    endpoint,
    type: 'ZOMATO',
  };
}

export function requestZomato ({ type = '', params = {}}) {
  if (!type) return null;

  const data = Object.keys(params).length ?
    { params } :
    {};

  switch (type) {
    case 'cities':
      data.params.count = 40;
      break;
    default: break;
  }

  return getZomato.get(`/${type}`, data)
    .then(
      (success) => {
        switch(type) {
          case 'cities':
            return zomato({
              data: success.data.location_suggestions,
              endpoint: type,
            });
          default: return null;
        }
      },
      (error) => {
        appFuncs.console('error')(error);

        return null;
      }
    );
}
