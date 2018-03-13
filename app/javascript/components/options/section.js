import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class OptionsSection extends Component {
  static propTypes = {
    inset:        PropTypes.bool,
    onClearClick: PropTypes.func,
    showClear:   PropTypes.bool,
    title:        PropTypes.string
  };

  static defaultProps = {
    inset:        false,
    onClearClick: () => {},
    showClear:   false,
    title:        null
  };

  render() {
    let classes = classnames('content-section options-section', {
      'content-inner': this.props.inset
    });

    return (
      <section className={classes}>
        {this.props.title && 
          <header>
            {this.props.showClear && 
              <button
                type="button"
                className="btn btn-small btn-right"
                onClick={(e) => { this.props.onClearClick(); }}
              >Clear</button>
            }
            <h4>{this.props.title}</h4>
          </header>
        }
        {this.props.children}
      </section>
    );
  }
}
