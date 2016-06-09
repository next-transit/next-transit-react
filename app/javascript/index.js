import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import routes from 'lib/routes.js';

ReactDOM.render((
  <Router history={browserHistory}>
    {routes}
  </Router>
), document.getElementById('next-transit-app'));
