import React from 'react';

export const Restaurant = ({ restaurant }) => { // eslint-disable-line
  return (
    <section>
      <a
        href={restaurant.url}
        target='_blank'
        >
        {restaurant.name}
      </a>
    </section>
  );
};

Restaurant.propTypes = {
  restaurant: React.PropTypes.object,
};

export default Restaurant;
