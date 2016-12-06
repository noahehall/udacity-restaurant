import React from 'react';

export const Filters = ({ updateFilters, filters }) => {
  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    switch (e.target.id) {
      case 'city-filter': {
        return updateFilters({ city: e.target.value });
      }
      default: return nulll;
    }
  };

  appFuncs.console('dir')(filters);
  appFuncs.console('dir')(updateFilters);

  return (
    <form onChange={handleSubmit} onSubmit={handleSubmit}>
      <h1>Filters</h1>
      <label htmlFor='city-filter'>
        City<input
          defaultValue={filters.city}
          id='city-filter'
        />
      </label>
      <input type='submit' />
    </form>
  );
};

Filters.propTypes = {
  filters: React.PropTypes.object,
  updateFilters: React.PropTypes.func,
};

export default Filters;
