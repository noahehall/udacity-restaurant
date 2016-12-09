import React from 'react';
import styles from './filters.css';

export const Filters = ({ updateFilters, filters, hasCities }) => {
  if (!hasCities) return null;

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
      <h4>Filters</h4>
      <section className='control-container'>
        <label htmlFor='city-filter'>
          <span>Cities</span>
          <input
            defaultValue={filters.city}
            id='city-filter'
          />
        </label>
      </section>
      <section className='control-container'>
        <label htmlFor='collection-filter'>
          <span>Collections</span>
          <input
            defaultValue={filters.collection}
            id='collection-filter'
          />
        </label>
      </section>
      <section className='control-container'>
        <label htmlFor='restaurant-filter'>
          <span>Restaurant Name</span>
          <input
            defaultValue={filters.restaurant}
            id='restaurant-filter'
          />
        </label>
      </section>
      <section className='control-container'>
        <label htmlFor='cuisines-filter'>
          {/* TODO: add checkbox for and / or filter*/}
          <span>Cuisine Type</span>
          <input
            defaultValue={filters.cuisines}
            id='cuisines-filter'
          />
        </label>
      </section>
      <section className='control-container'>
        <label htmlFor='aggregate_rating-filter'>
          <span>Rating</span>
          <input
            defaultValue={filters.aggregate_rating}
            id='aggregate_rating-filter'
          />
        </label>
      </section>
      <section className='control-container'>
        <label htmlFor='average_cost_for_two-filter'>
          <span>Average Cost for Two</span>
          <input
            defaultValue={filters.average_cost_for_two}
            id='average_cost_for_two-filter'
          />
        </label>
      </section>
      <section className='control-container'>
        <label htmlFor='filters-form-submit'>
          <span>&nbsp;</span>
          <input type='submit' value='Update Filters' />
        </label>
      </section>
    </form>
  );
};

Filters.propTypes = {
  filters: React.PropTypes.object,
  hasCities: React.PropTypes.bool,
  updateFilters: React.PropTypes.func,
};

export default Filters;
