import React, { Component, PropTypes } from 'react';

export default class About extends Component {
  static propTypes = {
    appTitle: PropTypes.string
  };

  static defaultProps = {
    appTitle: ''
  };

  render() {
    return (
      <div className="about">
        <h2>About</h2>

        <div className="content-inner content-section content-text">
          <p>
            <strong>{this.props.appTitle}</strong> let's you find the next few 
            arriving buses or trains as quickly and easily as possible.
          </p>
          <p>
            Choose a mode of transit, route, and direction, and stop you'll be 
            leaving from, and {this.props.appTitle} will tell you the next few 
            departure times at that stop.
          </p>
        </div>

        <h3>Helpful Tips</h3>
        <div className="content-inner content-section content-text">
          <ul className="ul">
            <li>
              Use &quot;Find nearby routes&quot; on the home page to quickly 
              start off from a route or stop that is close to your current location.
            </li>
            <li>
              Quickly see and go to a recent trips from the options page, which 
              you can get to from the icon at the top-right.
            </li>
            <li>
              Save recent trips so you will always know they're there.
            </li>
            <li>
              Your closest saved or recent trip will appear at the top of the 
              home page. More often than not, it's the one you want.
            </li>
            <li>
              Use the &quot;Save to Home Screen&quot; feature on your mobile 
              device to turn the site in a native-like app you can access 
              quickly.
            </li>
          </ul>
        </div>

        <h3>Open Data</h3>
        <div className="content-inner content-section content-text">
          Did you know that this app is served on top of an open data API? If 
          you're a developer or otherwise interested in the data, you can 
          request an API key from the{' '}
          <a href="http://next-transit.com" target="_blank">
            NEXT|Transit site
          </a>.
        </div>

        <div className="content-text">
          <p className="options-by-line">
            Built by <a href="http://twitter.com/reedlauber">reedlauber</a>
          </p>
        </div>
      </div>
    );
  }
}
