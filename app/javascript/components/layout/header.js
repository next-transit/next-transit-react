import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { browserHistory, Link } from 'react-router';

export default class LayoutHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    back_path: PropTypes.string
  };

  static defaultProps = {
    title: 'NEXT-Transit',
    back_path: null
  };

  constructor(...args) {
    super(...args);

    this.onBackClick = this.onBackClick.bind(this);
  }

  onBackClick(event) {
    event.preventDefault();

    if (window.history.length) {
      return browserHistory.goBack();
    }

    if (this.props.back_path) {
      browserHistory.push(this.props.back_path);
    }
  }

  render() {
    let back_classes = classnames('app-header-btn app-header-back-btn', {
      'active': !!this.props.back_path
    });
    let content_classes = classnames('content', {
      'hidden': !!this.props.show_map
    });

    return(
      <header className="app-header">
        {this.props.back_path &&
          <Link 
            to={this.props.back_path}
            className={back_classes} 
            title="Go back"
            onClick={(event) => { this.onBackClick(event); }}
          >
            <i className="icon-chevron-sign-left"></i>
          </Link>
        }
        <span className="app-title">{this.props.title}</span>
        <Link to="/options" className="app-header-btn">
          <i className="icon-reorder"></i>
        </Link>
      </header>
    );
  }
}
