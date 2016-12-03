import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/index.js';
import Idbstore from 'serviceworkers/idb/idb';
import React from 'react';
import styles from './start.css';

class Start extends React.Component {
  componentDidMount () {
    this.props.dispatch.requestZomato({
      params: { q: 'san fran' },
      type: 'cities',
    });

    this.props.dispatch.requestZomato({
      params: { q: 'oakland' },
      type: 'cities',
    });

    if (Idbstore) {
      const db = new Idbstore();

      // get all bart urls and hydrate store
      db.getKeysMatching(undefined, appConsts.zomatoBaseUrl)
        .then((keysArray) => keysArray.forEach(() => { // eslint-disable-line
          /*
          if (key.includes('http://api.bart.gov/api/sched.aspx'))
            return this.props.dispatch.getBart({
              hydrate: true,
              type: 'schedules',
              url: key,
            });
          if (key.includes('http://api.bart.gov/api/stn.aspx'))
            return this.props.dispatch.getBart({
              hydrate: true,
              type: 'stationInfo',
              url: key,
            });
            */
          return null;
        })
      );
    } else appFuncs.console('info')('db not found!');
  }

  render () {
    return (
      <div className='main'>
        <style scoped type='text/css'>{styles}</style>
        <h2>Lets get started!</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) =>
  ({
    zomato: state.zomato,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    dispatch: bindActionCreators(actionCreators, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Start);
