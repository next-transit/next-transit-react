import React, { Component, PropTypes } from 'react';

export default class SimpleNav extends Component {
  render() {
    return (
      <nav className="simple-nav">
        <ul>
          {this.props.children}
        </ul>
      </nav>
    );
  }
};
