import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleToggleMic } from '../../actions/mic';

class Mic extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { toggleMic, handleToggleMic } = this.props;

    handleToggleMic(!toggleMic);
  }

  render() {
    const { toggleMic } = this.props;
    let Voice;

    if (toggleMic) {
      Voice = require('../Voice');
    }

    return (
      <div className="mic">
        <button onClick={this.handleClick} className="mic__btn">
          <i className="fas fa-microphone-alt" />
        </button>
        {toggleMic && (
          <div className="mic__voice--modal">
            <button onClick={this.handleCloseTranscript} className="mic__x">
              <i className="fas fa-times" />
            </button>
            <Voice.default />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toggleMic: state.toggleMic,
});

Mic.propTypes = {
  toggleMic: PropTypes.bool.isRequired,
  handleToggleMic: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { handleToggleMic },
)(Mic);
