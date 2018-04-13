import React, { Component, PropTypes } from 'react';

export default class Loading extends Component {
  static propTypes = {
    content: PropTypes.node,
    isLoading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    content: null
  };

  timeout = null;

  state = {
    show: false
  };

  componentDidMount() {
    if (this.props.isLoading) {
      this.showLoading();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading !== nextProps.isLoading) {
      if (nextProps.isLoading) {
        this.showLoading();
      } else {
        this.hideLoading();
      }
    }
  }

  showLoading() {
    if (!this.timeout) {
      this.timeout = window.setTimeout(() => {
        this.setState({ show:true });
      }, 333);
    }
  }

  hideLoading() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.setState({ show:false });
  }

  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <div className="content-inner">
        {this.props.content || 'Loading...'}
      </div>
    );
  }
}
