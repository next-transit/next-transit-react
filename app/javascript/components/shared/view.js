import React, { Component, PropTypes } from 'react';
import SimpleNav from './simple-nav';

export default class View extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    innerContent: PropTypes.bool
  };

  static defaultProps = {
    innerContent: true
  };

  getInnerContent() {
    if (this.props.nav_items) {
      return (
        <div className="content-inner content-section">
          <SimpleNav>
            {this.props.nav_items}
          </SimpleNav>
        </div>
      );
    } else if (this.props.innerContent) {
      return (
        <div className="content-inner content-section">
          {this.props.children}
        </div>
      );
    }

    return this.props.children;
  }

  render() {
    return (
      <div className={this.props.name}>
        {this.getInnerContent()}
      </div>
    );
  }
};
