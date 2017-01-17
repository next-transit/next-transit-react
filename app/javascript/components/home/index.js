import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { pageStateUpdated } from 'lib/actions/page';

import Home from './home';

class HomeHandler extends Component {
  static propTypes = {
    twitter_acct: PropTypes.string
  };

  static defaultProps = {
    twitter_acct: ''
  };

  componentDidMount() {
    this.props.dispatch(pageStateUpdated({ footer:false }));
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
    route_types: state.route_types.route_types,
    settings: state.settings.settings
  };
})(HomeHandler);
