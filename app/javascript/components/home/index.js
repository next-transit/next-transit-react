import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { routeTypesRequested } from 'lib/actions/route-types';

import Home from './home';

class HomeHandler extends Component {
  static propTypes = {
    search_text: PropTypes.string,
    twitter_acct: PropTypes.string
  };

  static defaultProps = {
    search_text: 'Search...',
    twitter_acct: ''
  };

  componentDidMount() {
    this.props.dispatch(routeTypesRequested());
  }

  render() {
    return (
      <Home route_types={this.props.route_types} />
    );
  }
}

export default connect((state) => {
  console.log('agencies', state.agencies.agency)

  return {
    route_types: state.route_types.route_types
  };
})(HomeHandler);
