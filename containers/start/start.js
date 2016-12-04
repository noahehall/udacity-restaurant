import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/index.js';
import Idbstore from 'serviceworkers/idb/idb';
import React from 'react';
import styles from './start.css';
import StateParser from 'components/stateparser';

class Start extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.object,
    zomato: React.PropTypes.object,

  }
  componentDidMount () {
    if (appFuncs._.isEmpty(this.props.zomato.cities)) {
      this.props.dispatch.requestZomato({
        params: { q: 'san fran' },
        type: 'cities',
      });

      this.props.dispatch.requestZomato({
        params: { q: 'oakland' },
        type: 'cities',
      });
    }

    if (Idbstore) {
      const db = new Idbstore();
      appFuncs.console('dir')(db);
    } else appFuncs.console('info')('db not found!');
  }

  shouldComponentUpdate () {
    return true;
  }

  render () {
    const cities = this.props.zomato.cities || {};
    const cuisines = this.props.zomato.cuisines || {};
    const search = this.props.zomato.search || {};
    const collections = this.props.zomato.collections || {};

    return (
      <div className='main'>
        <style scoped type='text/css'>{styles}</style>
        <h2>Lets get started!</h2>
        <div>{
           StateParser({ cities, collections, cuisines, dispatch: this.props.dispatch, search })
        }</div>
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
