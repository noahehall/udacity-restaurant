import React, { Component } from 'react';
import styles from './notfound.css';

class notfound extends Component {
  render () {
    return (
      <div className='notfound'>
        <style scoped type='text/css'>{styles}</style>
        Sorry we could not find that route
      </div>
    );
  }
}

export default notfound;
