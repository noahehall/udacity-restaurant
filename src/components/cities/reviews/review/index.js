import React from 'react';
import styles from './review.css';
import * as Table from 'reactabular-table';

export const Review = ({ review }) => {
  if (appFuncs._.isEmpty(review)) return null;

  const rows = [
    {
      key: 'username',
      value: review.user.name,
    },
    {
      key: 'rating',
      value: review.rating,
    },
    {
      key: 'timestamp',
      value: review.review_time_friendly,
    },
  ];

  const columns = [
    {
      header: {
        label: 'Key',
      },
      property: 'key',
    },
    {
      header: {
        label: 'Value',
      },
      property: 'value',
    },
  ];

  return (
    <section className='review-entry'>
      <style scoped type='text/css'>{styles}</style>
      <section>
        About Reviewer
      </section>
      <Table.Provider
        className='review-table'
        columns={columns}
      >
        <Table.Body
          rowKey='key'
          rows={rows}
        />
      </Table.Provider>
      <section className='review-text'>
        {review.review_text}
      </section>
    </section>
  );
};

Review.propTypes = {
  review: React.PropTypes.object,
};

export default Review;
