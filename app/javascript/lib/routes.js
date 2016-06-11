import React from 'react';
import { Route } from 'react-router';

import App from 'components/app.js';

import Patterns from 'components/patterns';

export default (
  <Route path="/" component={App}>
    <Route path="/patterns" component={Patterns} />
  </Route>
);
