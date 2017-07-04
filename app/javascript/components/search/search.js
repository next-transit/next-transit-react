import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import View from 'components/shared/view';
import SearchForm from 'components/shared/search-form';

export default class Search extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    placeholderText: PropTypes.string,
    searchResults: PropTypes.array,
    searchTerm: PropTypes.string
  };

  static defaultProps = {
    placeholderText: '',
    searchResults: null,
    searchTerm: null
  };

  getResultItems() {
    if (this.props.searchResults) {
      return this.props.searchResults.map((route) => {
        const path = `/${route.route_type_slug}/${route.slug}`;

        return (
          <li key={`route-${route.route_id}`}>
            <Link to={`/${route.route_type_slug}/${route.slug}`}>
              <strong className={`${route.route_type_slug} ${route.slug}`}>
                {route.route_short_name}
              </strong>
              <span>{route.route_long_name}</span>
            </Link>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div className="search">
        <SearchForm
          onFormSubmit={this.props.onFormSubmit}
          placeholderText={this.props.placeholderText}
        />

        {!this.props.searchResults.length &&
          <View name="search-results" innerContent>
            Couldn’t find any matching routes.
          </View>
        }

        {!!this.props.searchResults.length &&
          <View name="search-results" nav_items={this.getResultItems()} />
        }
      </div>
    );
  }
}
