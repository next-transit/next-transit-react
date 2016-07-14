import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pageStateUpdated } from 'lib/actions/page';
import { routeDirectionsRequested } from 'lib/actions/route-directions';
import Route from './route';

class RouteHandler extends Component {
  componentDidMount() {
    this.props.dispatch(pageStateUpdated({ back:`/${this.props.routeParams.routeType}` }));

    if (this.props.route) {
      this.props.dispatch(pageStateUpdated({ title:this.props.route.route_name }));

      if (!this.props.directions
        && !this.props.directions_loading
        && !this.props.directions_error) 
      {
        this.props.dispatch(routeDirectionsRequested(this.props.routeParams.routeId));
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.route !== nextProps.route) {
      this.props.dispatch(pageStateUpdated({ title:nextProps.route.route_name }));
    }
  }

  render() {
    return (
      <Route 
        route_type={this.props.routeParams.routeType} 
        route_id={this.props.routeParams.routeId} 
        directions={this.props.directions} 
      />
    );
  }
}

export default connect((state, params) => {
  let { routeId } = params.routeParams;

  console.log('list', routeId, state.route_directions.directions)

  return {
    route: state.routes.routes[routeId],
    directions: state.route_directions.directions[routeId],
    directions_loading: state.route_directions.loading[routeId],
    directions_error: state.route_directions.errors[routeId]
  };
})(RouteHandler);