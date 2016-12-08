// pass this down to filter at each appropriate level
export const filterProps = (data, type, filter) => {
  if (!appFuncs._.isEmpty(data)) {
    if (!filter) return data;

    switch (type) {
      case 'collection':
      case 'restaurant':
      case 'city': { // eslint-disable-line
        return appFuncs._.pickBy(
          data,
          (value, key) => key.trim().toLowerCase().includes(filter.trim().toLowerCase())
        );
      }
      case 'cuisines': {
        return appFuncs._.pickBy(
          data,
          (rest, name) => { // eslint-disable-line
            try {
              const cuisines = rest.restaurant[type].trim().toLowerCase();
              const filters = filter.split(',');
              let total = 0;
              const required = filters.length;
              filters.forEach((thisFilter) => {
                if (cuisines.includes(thisFilter.trim().toLowerCase())) total++;
              });

              return total >= required;
            } catch (err) {
              return false;
            }
          }
        );
      }
      case 'aggregate_rating': {
        return appFuncs._.pickBy(
          data,
          (rest, name) => { // eslint-disable-line
            try {
              const rating = parseFloat(rest.restaurant.user_rating[type]); // eslint-disable-line
              const threshold = parseFloat(filter);

              return rating >= threshold;
            } catch (err) {
              return false;
            }
          }
        );
      }
      case 'average_cost_for_two': {
        return appFuncs._.pickBy(
          data,
          (rest, name) => { // eslint-disable-line
            try {
              const cost = parseFloat(rest.restaurant[type]); // eslint-disable-line
              const max = parseFloat(filter);

              return cost <= max;
            } catch (err) {
              return false;
            }
          }
        );
      }
      default: return data; // eslint-disable-line
    }
  }

  return {};
};

export default filterProps;
