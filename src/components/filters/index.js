import React from 'react';
import styles from './filters.css';

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
      case 'cuisines-filter': {
        return updateFilters({ cuisines: e.target.value });
      }
      case 'average_cost_for_two-filter':
      case 'aggregate_rating-filter': {
        const number = parseFloat(e.target.value);
        const type = e.target.id === 'average_cost_for_two-filter' ?
          'average_cost_for_two' :
          'aggregate_rating';

        return number >= 0 ?
          updateFilters({ [type]: number }) :
          null;
      }
      default: return null;
    }
  };


  return (
    <form
      className='filters-form'
      onChange={handleSubmit}
      onSubmit={handleSubmit}
    >
      <style scoped type='text/css'>{styles}</style>
      <h2>Filters</h2>
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
        <label htmlFor='restaurant-filter'>
          Restaurant Name<input
            defaultValue={filters.restaurant}
            id='restaurant-filter'
          />
        </label>
      </section>
      <section>
        <label htmlFor='cuisines-filter'>
          {/* TODO: add checkbox for and / or filter*/}
          Cuisine Type<input
            defaultValue={filters.cuisines}
            id='cuisines-filter'
          />
        </label>
      </section>
      <section>
        <label htmlFor='aggregate_rating-filter'>
          Rating<input
            defaultValue={filters.aggregate_rating}
            id='aggregate_rating-filter'
          />
        </label>
      </section>
      <section>
        <label htmlFor='average_cost_for_two-filter'>
          Average Cost for Two<input
            defaultValue={filters.average_cost_for_two}
            id='average_cost_for_two-filter'
          />
        </label>
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
