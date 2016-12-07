import React from 'react';

export const Filters = ({ updateFilters, filters }) => {
  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    switch (e.target.id) {
      case 'city-filter': {
        return updateFilters({ city: e.target.value });
      }
      case 'collection-filter': {
        return updateFilters({ collection: e.target.value });
      }
      case 'restaurant-filter': {
        return updateFilters({ restaurant: e.target.value });
      }
      case 'review-filter': {
        return updateFilters({ review: e.target.value });
      }
      default: return nulll;
    }
  };


  return (
    <form onChange={handleSubmit} onSubmit={handleSubmit}>
      <h1>Filters</h1>
      <section>
        <label htmlFor='city-filter'>
          Cities<input
            defaultValue={filters.city}
            id='city-filter'
          />
        </label>
      </section>
      <section>
        <label htmlFor='collection-filter'>
          Collections<input
            defaultValue={filters.collection}
            id='collection-filter'
          />
        </label>
      </section>
      <section>
        <label htmlFor='collection-filter'>
          Restaurants<input
            defaultValue={filters.restaurant}
            id='restaurant-filter'
          />
        </label>
      </section>
      <section>
        Restaurant Details Filters
          <section>
            <label htmlFor='collection-filter'>
              Reviews<input
                defaultValue={filters.review}
                id='review-filter'
              />
            </label>
          </section>
      </section>
      <input type='submit' />
    </form>
  );
};

Filters.propTypes = {
  filters: React.PropTypes.object,
  updateFilters: React.PropTypes.func,
};

export default Filters;
