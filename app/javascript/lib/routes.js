import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from 'components/app.js';

import Direction from 'components/direction';
import Home from 'components/home';
import Map from 'components/map';
import NotFound from 'components/not-found';
import Options from 'components/options';
import Patterns from 'components/patterns';
import RouteType from 'components/route-type';
import RouteHandler from 'components/route';
import Trips from 'components/trips';

import ApiTest from 'components/api-test';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/options" component={Options} />
    <Route path="/patterns" component={Patterns} />
    <Route path="/api-test" component={ApiTest} />
    <Route path="/:routeType/:routeId/map" component={Map} />
    <Route path="/:routeType/:routeId/:directionId/:fromStopId/choose" component={Direction} />
    <Route path="/:routeType/:routeId/:directionId/:fromStopId/:toStopId" component={Trips} />
    <Route path="/:routeType/:routeId/:directionId/:fromStopId" component={Trips} />
    <Route path="/:routeType/:routeId/:directionId" component={Direction} />
    <Route path="/:routeType/:routeId" component={RouteHandler} />
    <Route path="/:routeType" component={RouteType} />
    <Route path="*" component={NotFound} />
  </Route>
);
