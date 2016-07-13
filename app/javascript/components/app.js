import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { settingsRequested } from 'lib/actions/settings';
import { agencyRequested } from 'lib/actions/agencies';

import Header from 'components/layout/header';
import Footer from 'components/layout/footer';

export default class Application extends Component {
  state = {
    show_map: null
  };

  componentWillMount() {
    this.props.dispatch(settingsRequested(document.getElementById('next-transit-env')));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings && !nextProps.agency && !nextProps.isAgencyLoading) {
      this.props.dispatch(agencyRequested(nextProps.settings.agency));
    }
  }

  render() {
    let content_classes = classnames('content', {
      'hidden': !!this.state.show_map
    });

    return(
      <div className="container">
        {this.props.settings &&
          <Header title={this.props.page.title} back_path={this.props.page.back} />
        }
        <div className={content_classes}>
          <div className="content-panel">
            {this.props.children}
          </div>
        </div>
        <Footer />
        {this.state.show_map &&
          <div className="map active">
            <div id="map-inner" className="dark map-inner"></div>
          </div>
        }
      </div>
    );
  }
}

export default connect((state) => {
  return {
    agency: state.agencies.agency,
    isAgencyLoading: state.agencies.isAgencyLoading,

    page: state.page,
    settings: state.settings.settings
  };
})(Application);
