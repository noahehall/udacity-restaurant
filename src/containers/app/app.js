import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/index.js';
import { bindActionCreators } from 'redux';
import styles from './app.css';

// import checkInternet from 'server/checkconnection.js';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    msg: React.PropTypes.string,
  }

  /**
   * only loads scripts if node has internet access
   * @method getScripts
   * @return {[type]}   [description]
   */
  getScripts = () => {
    const nav = typeof navigator !== 'undefined' ? navigator : null;

    return 0 && (appConsts.nodeOnline || (nav && nav.onLine)) ?
      [
        { src: 'https://cdn.logrocket.com/LogRocket.min.js', type: 'text/javascript' },
        // to log session urls in production console.log(LogRocket.recordingURL);
        // add the github integration https://github.com/integration/logrocket
        {
          innerHTML: `if (typeof LogRocket !== 'undefined') { LogRocket.init('noahedwardhall/trainschedule', { shouldShowReportingButton: ${!appConsts.isProd && true} }); }`,
          type: 'text/javascript',
        }
      ] :
      [{}];
  }

  render () {
    return (
      <article className='app'>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          link={[
            {
              'href': 'http://fonts.googleapis.com/css?family=Muli|Varela%20Round',
              'rel': 'stylesheet',
              type:'text/css',
            },
          ]}
          meta={[
            { content: 'React F Your Starterkit by @noahedwardhall', name: 'description' },
            { content: 'Home', property: 'og:title' },
          ]}
          script={this.getScripts()}
          title='For Your Progressive React Starterkit'
        />
        <style scoped type='text/css'>{styles}</style>
        <nav>
          <ul className='navbar'>
            <li className='navitem'>
              <Link activeClassName='active' className='navlink' onlyActiveOnIndex={true} to={`/`} >Home</Link>
            </li>
            <li className='navitem'>
              <Link activeClassName='active' className='navlink' to={`start`} >Start</Link>
            </li>
            <li className='navitem ra'>
              <section>{this.props.msg}</section>
            </li>
          </ul>
        </nav>
        {this.props.children}
      </article>
    );
  }
}

const mapStateToProps = (state) =>
  ({
    msg: state.msg
  });

const mapDispatchToProps = (dispatch) =>
  ({
    actions: bindActionCreators(actionCreators, dispatch)
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);
