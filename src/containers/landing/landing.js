import React from 'react';
import Markdown from 'react-markdown';
import md from 'readme';

import styles from './landing.css';

class Landing extends React.Component {
  render () {
    return (
      <article className='main'>
        <style scoped type='text/css'>{styles}</style>
        <Markdown source={md} />
      </article>
    );
  }
}

export default Landing;
