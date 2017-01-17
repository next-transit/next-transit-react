import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Actions
import { agency_request } from 'lib/actions/agencies';
import { pageStateUpdated } from 'lib/actions/page'; 
import { routeRequested, routesRequested } from 'lib/actions/routes';
import { routeDirectionsRequested } from 'lib/actions/route-directions';
import { routeTypesRequested } from 'lib/actions/route-types';
import { settingsRequested } from 'lib/actions/settings';
import { routeDirectionStopsRequested } from 'lib/actions/stops';
import { tripsRequested } from 'lib/actions/trips';

// Selectors
import {
  getPageRouteDirections,
  getPageRouteDirectionsLoading,
  getPageRouteDirectionsError
} from 'lib/selectors/directions';
import {
  getPageTitle,
  getBackPath
} from 'lib/selectors/page';
import {
  getPageRoutes,
  getPageRoutesLoading,
  getPageRoutesRequestError
} from 'lib/selectors/routes';
import { getFooterRouteTypes } from 'lib/selectors/route-types';
import {
  getPageStops,
  getPageStopsLoading,
  getPageStopsError
} from 'lib/selectors/stops';

// Components
import Header from 'components/layout/header';
import Footer from 'components/layout/footer';

export default class Application extends Component {
  state = {
    show_map: null
  };

  componentWillMount() {
    this.props.dispatch(settingsRequested(document.getElementById('next-transit-env')));
    this.props.dispatch(pageStateUpdated({ ...this.props.params }));
  }

  componentWillReceiveProps(nextProps) {
    // If we don't have an Agency yet, fetch it
    if (nextProps.settings && !nextProps.agency && !nextProps.is_agency_loading) {
      this.props.dispatch(agency_request(nextProps.settings.agency));
    }

    // Only request other data if we already have an agency
    if (nextProps.agency) {
      // If any of the page (url) params change, dispatch that
      const pageChanges = this.getPageChanges(this.props, nextProps);
      
      if (pageChanges) {
        this.props.dispatch(pageStateUpdated(pageChanges));
      }

      let {
        routeType: pageRouteType,
        routeId: pageRouteId,
        directionId: pageDirectionId,
        fromStopId: pageFromStopId,
        toStopId: pageToStopId
      } = nextProps.page;

      // If we don't have route types yet, request them
      if (!nextProps.routeTypes && !nextProps.routeTypesLoading && !nextProps.routeTypesError) {
        this.props.dispatch(routeTypesRequested());
      }

      // If we have a selected route type but no related routes, fetch them
      if (pageRouteType
        && !nextProps.routes
        && !nextProps.routesLoading
        && !nextProps.routesError
      ) {
        this.props.dispatch(routesRequested(pageRouteType));
      }

      // If we have a selected route, but no related directions, fetch them
      if (pageRouteId 
        && !nextProps.directions
        && !nextProps.directionsLoading
        && !nextProps.directionsError
      ) {
        this.props.dispatch(routeDirectionsRequested(pageRouteId));
      }

      // If we have a selected route, and direction, but no stops, fetch them
      if (pageRouteId
        && pageDirectionId
        && !nextProps.stops
        && !nextProps.stopsLoading
        && !nextProps.stopsError
      ) {
        this.props.dispatch(routeDirectionStopsRequested(pageRouteId, pageDirectionId));
      }

      // If we have a selected route, direction, and from stop, but no trips, fetch them
      if (pageRouteId
        && pageDirectionId
        && pageFromStopId
        && !nextProps.trips
        && !nextProps.tripsLoading
        && !nextProps.tripsError
      ) {
        this.props.dispatch(tripsRequested(
          pageRouteId,
          pageDirectionId,
          pageFromStopId,
          pageToStopId
        ));
      }
    }
  }

  getPageChanges(prevProps, nextProps) {
    let initialChanges = null;

    const pageParams = ['routeType', 'routeId', 'directionId', 'fromStopId', 'toStopId'];

    return pageParams.reduce((changes, paramName) => {
      if (prevProps.params[paramName] !== nextProps.params[paramName]) {
        return {
          ...changes,
          [paramName]: nextProps.params[paramName]
        };
      }

      return changes;
    }, initialChanges);
  }

  render() {
    let content_classes = classnames('content', {
      'hidden': !!this.state.show_map
    });

    return(
      <div className="container">
        {this.props.settings &&
          <Header title={this.props.pageTitle} back_path={this.props.backPath} />
        }
        <div className={content_classes}>
          <div className="content-panel">
            {this.props.children}
          </div>
        </div>
        <Footer
          menuItems={this.props.footerRouteTypes}
          slug={this.props.page.routeType}
          active={this.props.showFooter}
        />
        {this.state.show_map &&
          <div className="map active">
            <div id="map-inner" className="dark map-inner"></div>
          </div>
        }
      </div>
    );
  }
}

export default connect((state, params) => {
  return {
    agency: state.agencies.agency,
    is_agency_loading: state.agencies.is_agency_loading,

    page: state.page,
    pageTitle: getPageTitle(state),
    backPath: getBackPath(state),
    showFooter: !!state.page.footer,
    settings: state.settings.settings,

    routeTypes: state.route_types.route_types,
    routeTypesLoading: state.route_types.route_types_loading,
    routeTypesError: state.route_types.route_types_error,
    footerRouteTypes: getFooterRouteTypes(state),

    routes: getPageRoutes(state),
    routesLoading: getPageRoutesLoading(state),
    routesError: getPageRoutesRequestError(state),
    
    directions: getPageRouteDirections(state),
    directionsLoading: getPageRouteDirectionsLoading(state),
    directionsError: getPageRouteDirectionsError(state),

    stops: getPageStops(state),
    stopsLoading: getPageStopsLoading(state),
    stopsError: getPageStopsError(state),

    trips: state.trips.trips,
    tripsLoad: state.trips.loading,
    tripsError: state.trips.error
  };
})(Application);
