import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/app/app.js';
import Landing from 'containers/landing/landing.js';
import Notfound from 'containers/notfound/notfound.js';
import Start from 'containers/start/start.js';

export default (
  <Route component={App} name='app' path='/'>
    <IndexRoute component={Landing} />
    <Route component={Start} name='Start' path='start' />
    <Route component={Notfound} name='404' path='*' />
  </Route>
);
