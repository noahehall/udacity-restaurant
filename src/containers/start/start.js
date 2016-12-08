// import StateParser from 'components/stateparser';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/index.js';
import Cities from 'components/cities';
import filterProps from 'components/filters/filterprops.js';
import Filters from 'components/filters';
import Idbstore from 'serviceworkers/idb/idb';
import React from 'react';
import styles from './start.css';

class Start extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.object,
    zomato: React.PropTypes.object,

  }

  componentDidMount () {
    /* get a certain city on startup
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
    */
    if (Idbstore) {
      const db = new Idbstore();
      appFuncs.console('dir')(db);
    } else appFuncs.console('info')('db not found!');
  }

  shouldComponentUpdate () {
    return true;
  }


  render () {
    const filters = this.props.zomato.filters;

    const cities = filterProps(
      this.props.zomato.cities,
      'city',
      filters.city
    );

    const collections = this.props.zomato.collections || {};
    const search = this.props.zomato.search || {};
    const reviews = this.props.zomato.reviews || {};

    return (
      <article className='main'>
        <style scoped type='text/css'>{styles}</style>
        <h1>Lets get started!</h1>
        <Filters
          filters={filters}
          updateFilters={this.props.dispatch.updateFilters}
        />
        <Cities
          addReview={this.props.dispatch.addReview}
          cities={cities}
          collections={collections}
          filterProps={filterProps}
          filters={filters}
          getCity={this.props.dispatch.requestZomato}
          restaurants={search}
          reviews={reviews}
        />
      </article>
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
