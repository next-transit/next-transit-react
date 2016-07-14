import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class LayoutFooter extends Component {
  static propTypes = {
    active: PropTypes.bool,
    slug: PropTypes.string,
    menu_items: PropTypes.array
  };

  static defaultProps = {
    active: false,
    menu_items: [] // [{ slug:'', label:'' }]
  };

  getMenuItems() {
    return this.props.menu_items.map((item) => {
      let classes = classes('app-footer-btn', {
        [item.slug]: !!item.slug
      });
      return (
        <li>
          <a href={`/${item.slug}`} className={classes}>{item.label}</a>
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
