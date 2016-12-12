import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { page_state_updated } from 'lib/actions/page';
import { route_types_requested } from 'lib/actions/route-types';

import Home from './home';

class HomeHandler extends Component {
  static propTypes = {
    twitter_acct: PropTypes.string
  };

  static defaultProps = {
    twitter_acct: ''
  };

  componentDidMount() {
    this.props.dispatch(page_state_updated({ footer:false }));

    // Request route types if not loaded already
    if (!this.props.route_types
      && !this.props.route_types_loading
      && !this.props.route_types_error
    ) {
      this.props.dispatch(route_types_requested());
    }
  }

  render() {
    let search_text;

    if (this.props.settings) {
      search_text = this.props.settings.search_text;
    }

    if (this.props.route_types_error) {
      return (
        <div>Oops, couldn't load route types</div>
      );
    }

    return (
      <Home
        search_text={search_text}
        route_types={this.props.route_types}
      />
    );
  }
}

export default connect((state) => {
  return {
    ...state.route_types,

    settings: state.settings.settings
  };
})(HomeHandler);
