import React, { Component } from 'react';
import styles from './notfound.css';

class notfound extends Component {
  render () {
    return (
      <article className='notfound'>
        <style scoped type='text/css'>{styles}</style>
        Sorry we could not find that route
      </article>
    );
  }
}

export default notfound;
