import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import classnames from 'classnames';

import { pageStateUpdated } from 'lib/actions/page';
import { searchRequested } from 'lib/actions/search';
import { getExactMatch } from 'lib/selectors/search';

import Search from './search';

class SearchHandler extends Component {
  constructor(...args) {
    super(...args);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.searchTerm) {
      this.props.dispatch(searchRequested(this.props.searchTerm));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSearchLoading
      && !nextProps.isSearchLoading
      && nextProps.exactMatch
    ) {
      this.redirectToExactMatch(nextProps);
    } else if (this.props.searchTerm !== nextProps.searchTerm && nextProps.searchTerm) {
      this.props.dispatch(searchRequested(nextProps.searchTerm)); 
    }
  }

  redirectToExactMatch(props) {
    const {
      route_type_slug: routeType,
      slug: routeId
    } = props.exactMatch;

    browserHistory.push(`/${routeType}/${routeId}`);
  }

  handleFormSubmit(searchTerm) {
    browserHistory.push(`/search/${window.encodeURIComponent(searchTerm)}`);
  }

  render() {
    return (
      <Search
        onFormSubmit={this.handleFormSubmit}
        placeholderText={this.props.placeholderText}
        searchResults={this.props.searchResults}
        searchTerm={this.props.searchTerm}
      />
    );
  }
}

export default connect((state, params) => {
  const searchTerm = params.routeParams.term;

  return {
    exactMatch: getExactMatch(state, { searchTerm }),
    isSearchLoading: state.search.isSearchLoading,
    placeholderText: state.settings.settings.search_text,
    searchResults: state.search.searchResults,
    searchTerm
  };
})(SearchHandler);
