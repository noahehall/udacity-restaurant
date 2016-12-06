// import StateParser from 'components/stateparser';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/index.js';
import Cities from 'components/cities';
import Idbstore from 'serviceworkers/idb/idb';
import React from 'react';
import styles from './start.css';
import Filters from 'components/filters';

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

  // pass this down to filter at each appropriate level
  filterProps = (data, type, filter) => {
    if (!appFuncs._.isEmpty(data)) {
      if (!filter) return data;

      switch (type) {
        case 'city': {
          return appFuncs._.pickBy(
            data,
            (value, key) => key.trim().toLowerCase().includes(filter.trim().toLowerCase())
          );
        }
        default: return data;
      }
    }

    return {};
  }

  render () {
    const filters = this.props.zomato.filters || {};

    const cities = this.filterProps(
      this.props.zomato.cities,
      'city',
      filters.city
    );

    const collections = this.filterProps(
      this.props.zomato.collections,
      'collection',
      filters.collection,
      filters.city,
    );

    const search = this.props.zomato.search || {};
    const reviews = this.props.zomato.reviews || {};


    return (
      <div className='main'>
        <style scoped type='text/css'>{styles}</style>
        <h2>Lets get started!</h2>
        <Filters
          filters={filters}
          updateFilters={this.props.dispatch.updateFilters}
        />
        <article>
          <Cities
            addReview={this.props.dispatch.addReview}
            cities={cities}
            collections={collections}
            filterProps={this.filterProps}
            getCity={this.props.dispatch.requestZomato}
            restaurants={search}
            reviews={reviews}
          />
        </article>
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
