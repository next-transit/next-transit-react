import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { pageStateUpdated } from 'lib/actions/page';

import Home from './home';

class HomeHandler extends Component {
  componentDidMount() {
    this.props.dispatch(pageStateUpdated({ footer:false }));
  }

  render() {
    if (this.props.route_types_error) {
      return (
        <div>Oops, couldn't load route types</div>
      );
    }

    return (
      <Home
        search_text={this.props.settings.search_text}
        route_types={this.props.route_types}
        twitter_acct={this.props.settings.twitter_acct}
      />
    );
  }
}

export default connect((state) => {
  return {
    route_types: state.route_types.route_types,
    settings: state.settings.settings || {}
  };
})(HomeHandler);
