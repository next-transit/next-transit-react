import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SearchForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    onFormSubmit: PropTypes.func,
    placeholderText: PropTypes.string
  };

  static defaultProps = {
    className: null,
    onFormSubmit: (searchTerm) => {},
    placeholderText: ''
  };

  constructor(...args) {
    super(...args);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const searchText = this.searchInput.value;

    if (searchText) {
      this.props.onFormSubmit(searchText);
    }
  }

  render() {
    const classes = classnames('content-inset search-form', this.props.className);

    return (
      <form className={classes} onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="term"
          placeholder={this.props.placeholderText}
          ref={(input) => { this.searchInput = input; }}
        />{' '}
        <button className="btn">Go</button>
      </form>
    );
  }
}
