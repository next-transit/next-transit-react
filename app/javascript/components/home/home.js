import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  static propTypes = {
    search_text: PropTypes.string,
    twitter_acct: PropTypes.string,
    route_types: PropTypes.array
  };

  static defaultProps = {
    search_text: 'Search...',
    twitter_acct: '',
    route_types: []
  };

  get_route_types() {
    return (this.props.route_types || []).filter((route_type) => {
      return route_type.route_type_order >= 0;
    }).map((route_type) => {
      let path = '/' + route_type.slug;
      if(route_type.parent) {
        path = '/' + route_type.parent + path;
      }
      return (
        <li
          key={`route-type-${route_type.id}`}
          className={`home-route-type home-route-type-${route_type.slug}`}
        >
          <Link to={path}>{route_type.label}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <form className="content-inset home-search" action="/search" method="GET">
            <input type="text" name="term" placeholder={this.props.search_text} />{' '}
            <button className="btn">Go</button>
          </form>

          <div className="content-inner home-recent">
            <div className="simple-nav smaller">
              <a href="" className="js-nav-link">
                <strong className=""></strong>
                <span title=""></span>
              </a>
            </div>
          </div>
        </div>

        <div className="content-inner content-section">
          <nav className="simple-nav">
            <ul>
              {this.get_route_types()}
            </ul>
          </nav>
        </div>

        <div className="content-inner content-section">
          <nav className="simple-nav small">
            <Link to="/locate">
              <i className="icon-compass"></i> Find nearby routes
            </Link>
          </nav>
        </div>

        <div className="content-text content-subtle">
          {this.props.twitter_acct && 
            <p>
              Follow{' '}
              <a href="http://twitter.com/{this.props.twitter_acct}">
                @{this.props.twitter_acct}
              </a>{' '}
              for info and updates.
            </p>
          }
        </div>
      </div>
    );
  }
}
