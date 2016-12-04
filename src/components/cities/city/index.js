import React from 'react';
import Collections from '../collections';

export const City = ({ collections, getCollection, city, restaurants }) => {
  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    getCollection({
      city: city.name,
      params: {
        'city_id': city.id,
      },
      type: 'collections',
    });
  };

  return (
    <article>
      <section>
        <h2>{city.name}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='searchCollections'>
            <input id='searchCollections' type='search' />
            <input type='submit' value='Get Collections' />
          </label>
        </form>
        <section>
          <Collections
            cityId={city.id}
            cityName={city.name}
            collections={collections}
            getRestaurants={getCollection}
            restaurants={restaurants}
          />
        </section>
      </section>
    </article>
  );
};

City.propTypes = {
  city: React.PropTypes.object.isRequired,
  collections: React.PropTypes.object,
  getCollection: React.PropTypes.func.isRequired,
  restaurants: React.PropTypes.object,
};

export default City;
