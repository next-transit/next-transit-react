import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from 'components/app.js';

import Home from 'components/home';
import NotFound from 'components/not-found';
import Options from 'components/options';
import Patterns from 'components/patterns';
import RouteType from 'components/route-type';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/options" component={Options} />
    <Route path="/patterns" component={Patterns} />
    <Route path="/:routeType" component={RouteType} />
  </Route>
);
