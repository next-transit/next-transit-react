import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

export default class LayoutHeader extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {
    title: 'NEXT-Transit'
  };

  state = {
    back_path: null
  };

  render() {
    let back_classes = classnames('app-header-btn app-header-back-btn', {
      'active': !!this.state.back_path
    });
    let content_classes = classnames('content', {
      'hidden': !!this.state.show_map
    });

    return(
      <header className="app-header">
        <a 
          href="{this.state.back_path}" 
          className={back_classes} 
          title="Go back"
        >
          <i className="icon-chevron-sign-left"></i>
        </a>
        <span className="app-title">{this.props.title}</span>
        <Link to="/options" className="app-header-btn">
          <i className="icon-reorder"></i>
        </Link>
      </header>
    );
  }
}
