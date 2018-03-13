import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const PAGE_SIZE = 5;

export default class TripsPaging extends Component {
  static propTypes = {
    currentOffset: PropTypes.number,
    currentPath: PropTypes.string.isRequired
  };

  static defaultProps = {
    currentOffset: 0
  };

  render() {
    const prevOffset = (this.props.currentOffset - PAGE_SIZE) || undefined;
    const nextOffset = (this.props.currentOffset + PAGE_SIZE) || undefined;

    return (
      <div className="trips-paging">
        <Link
          to={{
            pathname: this.props.currentPath,
            query: { offset: prevOffset }
          }}
          className="trips-paging-btn trips-paging-prev"
        >
          <i className="icon-long-arrow-left" />
        </Link>
        
        <Link
          to={{
            pathname: this.props.currentPath,
            query: { offset: nextOffset }
          }}
          className="trips-paging-btn trips-paging-next"
        >
          <i className="icon-long-arrow-right" />
        </Link>
      </div>
    );
  }
}
