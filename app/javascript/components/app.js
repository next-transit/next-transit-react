import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Header from 'components/layout/header';
import Footer from 'components/layout/footer';

export default class Application extends Component {
  static propTypes = {
    title: PropTypes.string,
    route_type: PropTypes.string,
    route: PropTypes.string
  };

  static defaultProps = {
    title: 'NEXT-Transit'
  };

  state = {
    show_map: null
  };

  render() {
    let content_classes = classnames('content', {
      'hidden': !!this.state.show_map
    });

    return(
      <div className="container">
        <Header />
        <div className={content_classes}>
          <div className="content-panel">
            {this.props.children}
          </div>
        </div>
        <Footer />
        {/*<div className="map js-map{{#if show_map}} active{{/if}}" ctrl="map">
          <div id="map-inner" className="dark map-inner js-map-inner"></div>
        </div>*/}
      </div>
    );
  }
}
