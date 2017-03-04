import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import About from './about';

class AboutHandler extends Component {
  static propTypes = {
    appTitle: PropTypes.string
  };

  static defaultProps = {
    appTitle: ''
  };

  render() {
    return (
      <About
        appTitle={this.props.appTitle}
      />
    );
  }
}

export default connect((state) => {
  return {
    appTitle: state.settings.settings.app_title
  };
})(AboutHandler);
