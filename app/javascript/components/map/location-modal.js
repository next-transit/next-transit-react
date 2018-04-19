import React, { Component, PropTypes } from 'react';

export default class LocationModal extends Component {
  static propTypes = {
    error: PropTypes.object,
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    error: null,
    isLoading: false
  };

  constructor(...args) {
    super(...args);

    this.handleOkayClick = this.handleOkayClick.bind(this);
  }

  state = {
    isShowing: false
  };

  componentDidMount() {
    this.setState({ isShowing:this.props.isLoading });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading !== nextProps.isLoading) {
      this.setState({
        isShowing: nextProps.isLoading
      });
    }
  }

  handleOkayClick() {
    this.setState({ isShowing:false });
  }


  getMessage() {
    if (this.props.error) {
      if (this.props.error.code === 1) {
        return 'Nearby routes don\'t work unless you allow access to your location.';
      }

      return 'Oops, something went wrong getting your location.';
    }

    return 'Getting location...';
  }

  render() {
    if (!this.state.isShowing) {
      return null;
    }

    return (
      <div className="map-loading-overlay">
        <div className="map-loading">
          <p>{this.getMessage()}</p>

          {!this.props.isLoading &&
            <div className="offset">
              <button className="btn" onClick={this.handleOkayClick}>
                Okay
              </button>
            </div>
          }
        </div>
      </div>
    );
  }
}