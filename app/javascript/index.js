import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from 'lib/routes.js';
import appReducer from 'lib/reducers';

const storeWithMiddleware = applyMiddleware(...[thunkMiddleware])(createStore);
const store = storeWithMiddleware(appReducer);

browserHistory.listen((location) => {
  if (location && typeof window.ga === 'function') {
    window.ga('send', 'pageview', location.pathname);
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('next-transit-app')
);
