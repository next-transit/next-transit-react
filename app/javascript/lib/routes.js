import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from 'components/app.js';

import Home from 'components/home';
import Patterns from 'components/patterns';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/patterns" component={Patterns} />
  </Route>
);
