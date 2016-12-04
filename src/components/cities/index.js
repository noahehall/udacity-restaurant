import React from 'react';
import City from './city';

export const Cities = ({ cities, collections, getCity, restaurants }) => {
  const cityList = [];

  if (!appFuncs._.isEmpty(cities))
    appFuncs._.forOwn(cities, (city) => {
      const cityCollections = collections[city.name] || {};
      const cityRestaurants = restaurants[city.name] || {};

      return cityList.push(
        <City
          city={city}
          collections={cityCollections}
          getCollection={getCity}
          key={city.name}
          restaurants={cityRestaurants}
        />
      );
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const city = e.target.search.value.trim();

      if (city)
        // also check city isnt in redux already
        getCity({
          params: { q: city },
          type: 'cities',
        });
    } catch (err) {
      // do nothing
    }
  };

  return (
    <article>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>
          <input id='search' type='search' />
          <input type='submit' value='Get City' />
        </label>
      </form>
      {cityList}
    </article>
  );
};

Cities.propTypes = {
  cities: React.PropTypes.object,
  collections: React.PropTypes.object,
  getCity: React.PropTypes.func.isRequired,
  restaurants: React.PropTypes.object,
};

export default Cities;
