import React from 'react';
import City from './city';
import styles from './cities.css';

export const Cities = ({
  addReview,
  cities,
  collections,
  filterProps,
  filters,
  getCity,
  restaurants,
  reviews,
}) => {
  const cityList = [];

  if (!appFuncs._.isEmpty(cities))
    appFuncs._.forOwn(cities, (city) => {
      const cityCollections = filterProps(
        collections[city.name] || {},
        'collection',
        filters.collection,
      );

      const cityRestaurants = restaurants[city.name] || {};
      const cityReviews = reviews[city.name] || {};

      return cityList.push(
        <City
          addReview={addReview}
          city={city}
          collections={cityCollections}
          filterProps={filterProps}
          filters={filters}
          getCollection={getCity}
          key={city.name}
          restaurants={cityRestaurants}
          reviews={cityReviews}
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
    <article className='cities'>
      <style scoped type='text/css'>{styles}</style>
      <form className='form-get-cities' onSubmit={handleSubmit}>
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
  addReview: React.PropTypes.func,
  cities: React.PropTypes.object,
  collections: React.PropTypes.object,
  filterProps: React.PropTypes.func,
  filters: React.PropTypes.object,
  getCity: React.PropTypes.func.isRequired,
  restaurants: React.PropTypes.object,
  reviews: React.PropTypes.object,
};

export default Cities;
