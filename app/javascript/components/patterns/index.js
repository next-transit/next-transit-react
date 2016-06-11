import React, { Component } from 'react';

export default class Patterns extends Component {
  render() {
    return (
      <div className="patterns">
        <h2 className="content-inset">UI Patterns</h2>

        <section className="patterns-section content-inset">
          <div className="patterns-left">
            <h4 className="patterns-header">Typography</h4>
            
            <h1>H1</h1>
            <h2>H2</h2>
            <h3>H3</h3>
            <h4>H4</h4>
            <h5>H5</h5>
            <h6>H6</h6>

            <p></p>

            <h4 className="patterns-header">Forms</h4>

            <div className="form">
              <div className="control-group">
                <div className="controls">
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="patterns-right">
            <h4 className="patterns-header">Buttons</h4>

            <a href="" className="btn">Link</a>
            <span className="btn">Span</span>
            <button className="btn">Button</button>
            <input type="button" className="btn" value="input[type=button]" />

            <p></p>

            <p><span className="btn btn-full">Full</span></p>
            <p><span className="btn btn-huge">Huge</span></p>
            <p><span className="btn btn-large">Large</span></p>
            <p><span className="btn">Default</span></p>
            <p><span className="btn btn-small">Small</span></p>
            <p><span className="btn btn-mini">Mini</span></p>

            <p></p>

            <p><span className="btn btn-primary">Primary</span></p>
            <p><span className="btn btn-secondary">Secondary</span></p>
            <p><span className="btn btn-add">Add</span></p>
            <p><span className="btn btn-danger">Danger</span></p>
          </div>
        </section>

        <section className="patterns-section">
          <h4 className="patterns-header">Components</h4>

          <div className="content-inner">
            .content-inner
          </div>

          <p></p>

          <div className="content-inner">
            <nav className="simple-nav">
              <ul>
                <li>
                  <a href="">.simple-nav (a)</a>
                </li>
                <li>
                  <span className="simple-nav-item">.simple-nav-item</span>
                </li>
                <li>
                  <a href=""><strong>Important</strong> nav item info</a>
                </li>
                <li>
                  <a href=""><i className="icon-map-marker"></i> Nav item w/ Icon</a>
                </li>
              </ul>
            </nav>
          </div>

          <p></p>

          <div className="content-inner">
            <nav className="simple-nav small">
              <ul>
                <li>
                  <a href="">.simple-nav.small</a>
                </li>
                <li>
                  <a href=""><strong>Important</strong> Northbound</a>
                </li>
              </ul>
            </nav>
          </div>

          <p></p>

          <div className="content-inner">
            <nav className="simple-nav smaller">
              <ul>
                <li>
                  <a href="">.simple-nav.smaller</a>
                </li>
                <li>
                  <a href=""><strong>Important</strong> Southbound</a>
                </li>
              </ul>
            </nav>
          </div>

          <p></p>

          <div className="content-inner trips-header">
            <div className="trips-header-from-stop"><a href=""><i className="icon-map-marker"></i> From Station</a></div>
            <div className="trips-header-reverse"><a href=""><i className="icon-exchange"></i></a></div>
            <div className="trips-header-to-stop"><a href="">To Station <i className="icon-map-marker"></i></a></div>
          </div>

          <p></p>
          <div className="message">
            <p>Message</p>
          </div>
          <div className="message success">
            <p>Success message</p>
          </div>
        </section>
      </div>
    );
  }
}
