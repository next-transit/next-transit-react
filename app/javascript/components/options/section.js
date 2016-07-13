import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class OptionsSection extends Component {
  static propTypes = {
    title:        PropTypes.string,
    show_clear:   PropTypes.bool,
    inset:        PropTypes.bool
  };

  static defaultProps = {
    title:        null,
    show_clear:   false,
    inset:        false
  };

  render() {
    let classes = classnames('content-section options-section', {
      'content-inner': this.props.inset
    });

    return (
      <section className={classes}>
        {this.props.title && 
          <header>
            {this.props.show_clear && 
              <button type="button" className="btn btn-small btn-right">Clear</button>
            }
            <h4>{this.props.title}</h4>
          </header>
        }
        {this.props.children}
      </section>
    );
  }
}
