import React from 'react';
import Collections from '../collections';

export const City = ({
  addReview,
  collections,
  getCollection,
  city,
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

  return (
    <article>
      <section>
        <h2>
          {city.name}
          <button
            id='get-collections'
            onClick={handleClick}
            type='submit'
            value='Get Collections'
          >
            Get Collections
          </button>
        </h2>
        <section>
          {
            hasCollections ?
              <Collections
                addReview={addReview}
                cityId={city.id}
                cityName={city.name}
                collections={collections}
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
  getCollection: React.PropTypes.func.isRequired,
  restaurants: React.PropTypes.object,
  reviews: React.PropTypes.object,
};

export default City;