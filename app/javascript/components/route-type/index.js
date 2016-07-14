import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pageStateUpdated } from 'lib/actions/page';
import RoutesList from './routes-list';

class RouteTypeHandler extends Component {
  componentDidMount() {
    this.props.dispatch(pageStateUpdated({ back:'/' }));

    if (this.props.route_type) {
      this.props.dispatch(pageStateUpdated({ title:this.props.route_type.label }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.route_type && nextProps.route_type) {
      this.props.dispatch(pageStateUpdated({ title:nextProps.route_type.label }));
    }
  }

  render() {
    return (
      <RoutesList routes={this.props.routes} />
    );
  }
}

export default connect((state, params) => {
  let { routeType } = params.routeParams;

  return {
    route_type: state.route_types.route_types[routeType],
    routes: state.routes.route_type_routes[routeType]
  };
})(RouteTypeHandler);
