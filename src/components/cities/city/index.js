import React from 'react';
import Collections from '../collections';
import styles from './city.css';

export const City = ({
  addReview,
  collections,
  city,
  filterProps,
  filters,
  getCollection,
  restaurants,
  reviews,
}) => {
  const handleClick = (e) => {
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

  const hasCollections = !collections.noneExist;
  const hasNotRequestedCollections = appFuncs._.isEmpty(collections);

  return (
    <article>
      <style scoped type='text/css'>{styles}</style>
      <section className='city-entry'>
        <h4>
          {city.name}
          {
            hasNotRequestedCollections &&
            <button
              id='get-collections'
              onClick={handleClick}
              type='submit'
              value='Get Collections'
              >
                Get Collections
              </button>
          }
        </h4>
        <section>
          {
            hasCollections ?
              <Collections
                addReview={addReview}
                cityId={city.id}
                cityName={city.name}
                collections={collections}
                filterProps={filterProps}
                filters={filters}
                getRestaurants={getCollection}
                restaurants={restaurants}
                reviews={reviews}
              /> :
              <div>No Collections Exist</div>
          }
        </section>
      </section>
    </article>
  );
};

City.propTypes = {
  addReview: React.PropTypes.func,
  city: React.PropTypes.object.isRequired,
  collections: React.PropTypes.object,
  filterProps: React.PropTypes.func,
  filters: React.PropTypes.object,
  getCollection: React.PropTypes.func.isRequired,
  restaurants: React.PropTypes.object,
  reviews: React.PropTypes.object,
};

export default City;
