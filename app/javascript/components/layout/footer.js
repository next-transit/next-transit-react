import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class LayoutFooter extends Component {
  static propTypes = {
    active: PropTypes.bool,
    menuItems: PropTypes.array,
    slug: PropTypes.string
  };

  static defaultProps = {
    active: false,
    menuItems: [], // [{ slug:'', label:'' }]
    slug: null
  };

  getMenuItems() {
    return this.props.menuItems && this.props.menuItems.map((item) => {
      let classes = classnames('app-footer-btn', {
        '-active': item.slug === this.props.slug
      });
      return (
        <li key={item.slug}>
          <a href={`/${item.slug}`} className={classes}>{item.menu_label}</a>
        </li>
      );
    });
  }

  render() {
    let classes = classnames(`app-footer ${this.props.slug}`, {
      active: this.props.active
    });

    return (
      <footer className={classes}>
        <ul>
          <li className="">
            <Link to="/" className="app-footer-btn">
              <i className="icon-home"></i>
            </Link>
          </li>
          {this.getMenuItems()}
        </ul>
      </footer>
    );
  }
}
